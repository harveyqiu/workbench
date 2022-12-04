import * as path from "https://deno.land/std@0.166.0/path/mod.ts";

const [operation, content] = Deno.args;

const home = Deno.env.get("HOME");

async function getConfigData(home: string): Promise<string> {
  const configPath = path.resolve(home, "workbench");
  const configData = await Deno.readTextFile(configPath);
  return configData;
}

if (home) {
  switch (operation as string) {
    case "set": {
      const filePath = path.resolve(Deno.cwd(), content);

      const configPath = path.resolve(home, "workbench");
      await Deno.writeTextFile(configPath, filePath);

      break;
    }
    case "cat": {
      const configData = await getConfigData(home);

      const workbenchData = await Deno.readTextFile(configData);
      console.log(workbenchData);

      break;
    }
    case "add": {
      const configData = await getConfigData(home);
      const appendContent = "\n\n" + content
      if (content) {
        await Deno.writeTextFile(configData, appendContent, { append: true });
      }
      break;
    }
  }
} else {
  console.log("Cannot get the home directory");
}
