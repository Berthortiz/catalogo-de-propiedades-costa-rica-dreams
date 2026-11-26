import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const siteUrl = "https://propiedades.crdreamsestate.com";
const distDirectory = resolve(projectRoot, "dist");
const listingsPath = resolve(projectRoot, "src/services/listings.json");
const htmlTemplatePath = resolve(distDirectory, "index.html");

const escapeHtml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

const listings = JSON.parse(await readFile(listingsPath, "utf8"));
if (!Array.isArray(listings.properties)) {
    throw new Error("El archivo listings.json no contiene una lista de propiedades.");
}

const htmlTemplate = await readFile(htmlTemplatePath, "utf8");
if (!/<title>[\s\S]*?<\/title>/i.test(htmlTemplate) || !/<\/head>/i.test(htmlTemplate)) {
    throw new Error("No se encontró el título o el cierre de <head> en dist/index.html.");
}

const seenIds = new Set();
const visibleProperties = listings.properties.filter((property) => property.oculta !== true);

for (const property of visibleProperties) {
    if (seenIds.has(property.id)) {
        throw new Error(`Hay más de una propiedad con el id ${property.id}.`);
    }
    seenIds.add(property.id);

    const imagePath = property.images?.[0];
    if (!imagePath) {
        throw new Error(`La propiedad ${property.id} no tiene una imagen principal.`);
    }

    const imageFilePath = resolve(projectRoot, "public", imagePath.replace(/^\/+/, ""));
    await access(imageFilePath);

    const propertyUrl = `${siteUrl}/products/${encodeURIComponent(property.id)}`;
    const imageUrl = new URL(imagePath, `${siteUrl}/`).href;
    const description = property.description?.summary ?? property.title;
    const safeTitle = escapeHtml(property.title);
    const safeDescription = escapeHtml(description);
    const safePropertyUrl = escapeHtml(propertyUrl);
    const safeImageUrl = escapeHtml(imageUrl);

    const metadata = [
        `<meta name="description" content="${safeDescription}" />`,
        `<link rel="canonical" href="${safePropertyUrl}" />`,
        '<meta property="og:type" content="website" />',
        '<meta property="og:site_name" content="Costa Rica Dreams" />',
        `<meta property="og:title" content="${safeTitle}" />`,
        `<meta property="og:description" content="${safeDescription}" />`,
        `<meta property="og:url" content="${safePropertyUrl}" />`,
        `<meta property="og:image" content="${safeImageUrl}" />`,
        `<meta property="og:image:secure_url" content="${safeImageUrl}" />`,
        `<meta property="og:image:alt" content="${safeTitle}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        `<meta name="twitter:title" content="${safeTitle}" />`,
        `<meta name="twitter:description" content="${safeDescription}" />`,
        `<meta name="twitter:image" content="${safeImageUrl}" />`,
    ].join("\n  ");

    const propertyHtml = htmlTemplate
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle} | Costa Rica Dreams</title>`)
        .replace(/<\/head>/i, `  ${metadata}\n</head>`);

    const outputPath = resolve(distDirectory, "products", `${property.id}.html`);
    await mkdir(resolve(distDirectory, "products"), { recursive: true });
    await writeFile(outputPath, propertyHtml, "utf8");
}

console.log(`Se generaron metadatos de portada para ${visibleProperties.length} propiedades.`);
