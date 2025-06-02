import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

const arrayLinks = [
  "cleveland",  
  "minneapolis",  
  "test-atlanta-office", 
  "test-austin-office",
  "test-gating-form", 
  "test-office-landing"];

const linkLocal = "http://localhost:8080/";
const linkServidor = "http://192.168.118.19:8080/web/group/";
const pastaSaida = './prints';

if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida);
}

async function tirarPrint(browser, url) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 3000 });
  
    try {
      console.log(`URL: ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('body');
      await new Promise(resolve => setTimeout(resolve, 5000));
      const screenshot = await page.screenshot();
      return screenshot;
    } catch (err) {
      console.error(`Erro ao carregar ${url}: ${err.message}`);
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
  
    const numDiffPixels = pixelmatch(
      img1.data, img2.data, diff.data, width, height,
      { threshold: 0.1 }
    );
  
    const totalPixels = width * height;
    const igualdade = 100 - ((numDiffPixels / totalPixels) * 100);
  
    if (igualdade < 97) {
      console.log(" !------------------------------ Verificar tela ------------------------------! ")
      fs.writeFileSync(path.join(pastaSaida, nomeArquivoDiff), PNG.sync.write(diff));
    }
  
    return igualdade;
  }

(async () => {
  console.log("Iniciando comparação visual...");

  const browser = await puppeteer.launch({ headless: 'new' }); // colocar false para ver abrir cada aba - colocar 'new' para nao precisar abrir cada aba 

  for (let pathName of arrayLinks) {
    const urlLocal = linkLocal + pathName;
    const urlServidor = linkServidor + pathName;

    try {
      const nomeLocal = `${pathName.replaceAll("/","_")}_local.png`;
      const nomeServidor = `${pathName.replaceAll("/","_")}_servidor.png`;
      const nomeDiff = `${pathName.replaceAll("/","_")}_diff.png`;

      const imgLocal = await tirarPrint(browser, urlLocal, nomeLocal);
      const imgServidor = await tirarPrint(browser, urlServidor, nomeServidor);

      if (!imgLocal || !imgServidor) {
        console.log(`${pathName} - Não foi possível capturar uma das imagens.\n`);
        continue;
      }

      const igualdade = compararBuffers(imgLocal, imgServidor, nomeDiff).toFixed(2);
      console.log(`${pathName} - Igualdade visual: ${igualdade}%\n`);
    } catch (err) {
      console.log(`${pathName} - Erro inesperado: ${err.message}\n`);
    }
  }

    const [initialPage] = await browser.pages();
    if (initialPage) await initialPage.close();
  

  console.log("Comparação finalizada.");
})();