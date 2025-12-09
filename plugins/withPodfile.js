const { withDangerousMod, withPlugins } = require('@expo/config-plugins');

const fs = require('fs');
const path = require('path');

async function readFile(path) {
  return fs.promises.readFile(path, 'utf8');
}

async function saveFile(path, content) {
  return fs.promises.writeFile(path, content, 'utf8');
}

module.exports = (config) =>
  withPlugins(config, [
    (config) => {
      return withDangerousMod(config, [
        'ios',
        async (config) => {
          const file = path.join(config.modRequest.platformProjectRoot, 'Podfile');

          /*
           * Need to remove the line before adding it.
           * If we don't do this and we run `expo prebuild` in a dirt project
           * our file will have the same line added twice
           */
          const contents = (await readFile(file)).replace(
            /pod 'IQKeyboardManagerSwift', :git => 'https:\/\/github.com\/douglasjunior\/IQKeyboardManager.git', :branch => 'react-native-keyboard-manager'\n\n/g,
            '',
          );

          /*
           * Now re-adds the content
           */
          await saveFile(
            file,
            `pod 'IQKeyboardManagerSwift', :git => 'https://github.com/douglasjunior/IQKeyboardManager.git', :branch => 'react-native-keyboard-manager'\n\n${contents}`,
          );
          return config;
        },
      ]);
    },
  ]);