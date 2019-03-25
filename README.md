# How to run this app?

If you finish cloning the repository, you should have everything you need to run this app correctly. But if for some reason
you can't do that or it appears incredibly ugly or buggy try to run this command: 
**npm run build**.
This command will install all dependencies and it'll build the app. But before doing that, make sure you have **node.js** installed on your machine.

Some additional notes:

- Preffered versions: **Node**: 10.13.0, **NPM**: 6.4.1.
If you're not building this app, ignore this info.

- If you wish to run building application and installing dependencies separately, you can do that by firing **npm install** and **npm run dev**  commands.

- Also if you want to run watch mode to test some changes you can do that by firing **npm run dev:w** command. It's going to rebundle every scss / typescript / assets change.

# Info about this project

- Naming conventions:
    - BEM for naming HTML id's and classes
    - PascalCase for Components
    - camelCase for functions  
    - ANGRY_CASE for Selectors and configs

- Folder structure 
    - **resources/** keeps all assets (with images and fonts), typescript to be bundled into bundle.js and scss to be bundled into style.css.
    - **public/** keeps all bundles files, ready to be shown by server. 

- TypeScript Components
    - These are simply auto-launching functions. Each of these components has same simple structure:
        - Grabbed Selectors from HTML in one **Selector** object (if not, selectors are probably imported from another file)
        - List of functions
        - List of events 
 
 and that's all :)
 
 ### Do you write classes?
 Yes, i'm writing classes when I need to. When code needs to be fully reusable or it has to have some OOP features like inheritance, polymorphism etc. In these cases I use OOP, but I found functional components to be easier to create and maintain when it comes to make simple UI :)
 
 ### Do you use interfaces?   
 Yes, a lot! But in this project I only used Selectors and configs, which all of them were strings only, so there wasn't any point to put interfaces there
 
 