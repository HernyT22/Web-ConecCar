import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';

async function generatePDF() {
  console.log('🚀 Iniciando generación de PDF...');

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const screenshots = [];

  // Captura Desktop
  console.log('📸 Capturando versión Desktop...');
  const desktopPage = await context.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  const desktopScreenshot = await desktopPage.screenshot({
    fullPage: true,
    type: 'png'
  });
  screenshots.push({
    data: desktopScreenshot,
    label: 'Desktop - Página Completa'
  });
  await desktopPage.close();

  // Captura Mobile
  console.log('📱 Capturando versión Mobile...');
  const mobilePage = await context.newPage({
    viewport: { width: 375, height: 667 }
  });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  const mobileScreenshot = await mobilePage.screenshot({
    fullPage: true,
    type: 'png'
  });
  screenshots.push({
    data: mobileScreenshot,
    label: 'Mobile - Página Completa'
  });
  await mobilePage.close();

  await browser.close();

  console.log('📄 Generando PDF...');

  // Crear PDF con pdf-lib
  const pdfDoc = await PDFDocument.create();

  for (const screenshot of screenshots) {
    const img = await pdfDoc.embedPng(screenshot.data);
    const { width, height } = img.scale(1);

    // Ajustar el tamaño de la página al tamaño de la imagen
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  writeFileSync('ConecCar-Presentacion.pdf', pdfBytes);

  console.log('✅ PDF generado exitosamente: ConecCar-Presentacion.pdf');
}

generatePDF().catch(console.error);
