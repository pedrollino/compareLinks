import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const pastaSaida = './prints';
if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida);
}

async function tirarPrint(browser, url) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 3000 });
  try {
    console.log("Acessando URL:", url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('body', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    const screenshot = await page.screenshot();
    return screenshot;
  } catch (err) {
    console.error("Erro ao capturar print de:", url, err.message);
    return null;
  } finally {
    await page.close();
  }
}

function compararBuffers(buf1, buf2, nomeArquivoDiff) {
  const img1 = PNG.sync.read(buf1);
  const img2 = PNG.sync.read(buf2);
  const width = Math.min(img1.width, img2.width);
  const height = Math.min(img1.height, img2.height);
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  const igualdade = 100 - ((numDiffPixels / (width * height)) * 100);

  console.log(`Comparação resultou em ${igualdade.toFixed(2)}% de similaridade.`);
  if (igualdade < 97) {
    const diffPath = path.join(pastaSaida, nomeArquivoDiff);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log(`Imagem com diferença salva em: ${diffPath}`);
  }

  return igualdade;
}

app.post('/comparar', async (req, res) => {
  const { linkLocal, linkServidor, links } = req.body;
  const urlsOk = [], urlsDiferentes = [];

  const browser = await puppeteer.launch({ headless: 'new' });

  for (const pathName of links) {
    const urlLocal = linkLocal + pathName;
    const urlServidor = linkServidor + pathName;
    const nomeDiff = `${pathName.replaceAll('/', '_')}_diff.png`;

    console.log(`\nIniciando comparação para: ${pathName}`);

    const imgLocal = await tirarPrint(browser, urlLocal);
    const imgServidor = await tirarPrint(browser, urlServidor);

    if (!imgLocal || !imgServidor) {
      console.warn(`Print falhou para ${pathName}. imgLocal: ${!!imgLocal}, imgServidor: ${!!imgServidor}`);
      continue;
    }

    try {
      const igualdade = compararBuffers(imgLocal, imgServidor, nomeDiff);
      if (igualdade >= 97) {
        urlsOk.push(pathName);
      } else {
        urlsDiferentes.push(pathName);
      }
    } catch (err) {
      console.error(`Erro na comparação para ${pathName}:`, err.message);
      urlsDiferentes.push(pathName);
    }
  }

  await browser.close();
  console.log("\nResumo final:");
  console.log("URLs OK:", urlsOk);
  console.log("URLs com diferença:", urlsDiferentes);

  res.json({ urlsOk, urlsDiferentes });
});

app.listen(4000, () => console.log('Servidor rodando na porta 4000'));