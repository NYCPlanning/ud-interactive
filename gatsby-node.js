/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

// set custom webpack config to bundle .glb files 
exports.onCreateWebpackConfig = ({
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(glb)$/i,
          use: [
            {
             loader: 'file-loader',
             options: {
              outputPath: 'assets/models',
              sourceMap: true
             }
            }
           ],
        },
        {
          test: /\.(fbx)$/i,
          use: [
            {
             loader: 'file-loader',
             options: {
              outputPath: 'assets/models',
              sourceMap: true
             }
            }
           ],
        },
      ],
    },
  })
} 
