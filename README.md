# chrome-issue-1304217 EDIT 7/21/2022: Now an issue in Firefox. 
To test make sure to first install yarn if not already in you local dev enviroment. Yarn install will automatically download the required packages. Use  `yarn serve` to run the project locally. Once app started navigate to http://localhost:8080/dist/ for the index page. You should see two charts and when you print the page it takes a minute or two but you will see that it has 600+ pages with all of them being blank except the first page.

Here is what happens with the chart. The chart renders on the page, then I add two event listeners (beforeprint, afterprint) to the canvas element. This then converts the canvas to a data URL and I append a image tag to the parent container of the canvas with the source set to the data URL. I set the canvas to display none. On the afterprint event listener I remove the image and set the canvas back to display.

I will note that this is a semi legacy implementation of printing these charts. My newer implementation is much simpler but if you are able to fix the issue it would be appreciated. 


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).