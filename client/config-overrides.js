const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@': 'src',
        '@views': 'src/views',
        '@assets': 'src/assets',
        '@components': 'src/components',
        '@config': 'src/config',
        '@actions': 'src/actions',
        '@reducers': 'src/reducers',
        '@services': 'src/services',
        '@enhancers': 'src/enhancers',
    }) (config);

    return config;
}