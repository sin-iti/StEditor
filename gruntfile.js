module.exports = function (grunt) {
    grunt.initConfig({
        ts:  {
            default: {
                tsconfig: './tsconfig.json',
                outDir: "dist"
            }
        },
        watch: {
            mytry: {
                src: ["src/**/*.ts"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
}