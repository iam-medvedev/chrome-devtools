import fs from "fs/promises";
import path from "path";

const publicDir = path.resolve(__dirname, "./public");
const packagesDir = path.resolve(__dirname, "./packages");

/** Get all HTML files from public directory */
async function getHtmlFiles(): Promise<string[]> {
  const files = await fs.readdir(publicDir);
  return files.filter((file) => file.endsWith(".html"));
}

/** Extract package name from HTML filename */
function getPackageName(htmlFile: string): string {
  return path.basename(htmlFile, ".html").replace(/_/g, "-");
}

// Create package.json for each package
async function createPackageJson(packageName: string, packageDir: string) {
  const rootPackageJson = JSON.parse(
    await fs.readFile("./package.json", "utf-8")
  );

  const packageJson = {
    ...rootPackageJson,
    name: `@chrome-devtools/${packageName}`,
  };

  await fs.writeFile(
    path.resolve(packageDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

/** Copy files from source path to destination path */
async function copyFiles(copyPairs: [string, string][]) {
  for (const [sourcePath, destPath] of copyPairs) {
    try {
      // Create destination directory
      await fs.mkdir(path.dirname(destPath), { recursive: true });

      // Check if source is directory or file
      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        // Copy entire directory
        await fs.cp(sourcePath, destPath, { recursive: true });
        console.log(`Copied directory: ${sourcePath} -> ${destPath}`);
      } else {
        // Copy single file
        await fs.copyFile(sourcePath, destPath);
        console.log(`Copied file: ${sourcePath} -> ${destPath}`);
      }
    } catch (error) {
      console.warn(
        `Warning: Could not copy ${sourcePath} to ${destPath}:`,
        error
      );
    }
  }
}

/** Create README.md for package */
async function createReadme(packageName: string, packageDir: string) {
  const originalReadme = await fs.readFile(
    path.resolve(__dirname, "README.md"),
    "utf-8"
  );
  const lines = originalReadme.split("\n");
  lines[0] = `# @chrome-devtools/${packageName}`;

  const newReadme = lines.join("\n");
  await fs.writeFile(path.resolve(packageDir, "README.md"), newReadme);
}

/** Build a single package */
async function buildPackage(htmlFile: string) {
  const packageName = getPackageName(htmlFile);
  const packageDir = path.resolve(packagesDir, packageName);

  console.log(`Building package: ${packageName}`);

  // Create package directory
  await fs.mkdir(packageDir, { recursive: true });

  await Bun.build({
    entrypoints: [path.resolve(publicDir, htmlFile)],
    outdir: packageDir,
    minify: true,
    target: "browser",
    format: "esm",
    splitting: false,
    sourcemap: "none",
    packages: "external",
  });

  // Copy files
  await copyFiles([
    [
      path.resolve(publicDir, "./core/i18n/locales"),
      path.resolve(packageDir, "./locales"),
    ],
    [path.resolve(publicDir, "./Images"), path.resolve(packageDir, "./")],
    [
      path.resolve(
        publicDir,
        "./models/live-metrics/web-vitals-injected/web-vitals-injected.generated.js"
      ),
      path.resolve(
        packageDir,
        "./web-vitals-injected/web-vitals-injected.generated.js"
      ),
    ],
  ]);

  // Create package.json
  await createPackageJson(packageName, packageDir);

  // Create README.md
  await createReadme(packageName, packageDir);

  console.log(`Package ${packageName} built successfully`);
}

/** Main build function */
async function build() {
  console.log("Starting build process...");

  // Create packages directory
  await fs.mkdir(packagesDir, { recursive: true });

  // Get all HTML files
  const htmlFiles = await getHtmlFiles();
  console.log(
    `Found ${htmlFiles.length} HTML files:`,
    htmlFiles.map(getPackageName)
  );

  // Build each package
  for (const htmlFile of htmlFiles) {
    await buildPackage(htmlFile);
  }

  console.log(`All ${htmlFiles.length} packages built successfully!`);
  console.log(`Packages created in: ${path.resolve(packagesDir)}`);
}

// Run the build
await build();
