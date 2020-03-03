### Project structure:
* src
  - components
    - FormComponents
      - FormField.js
      The field which you can use for your own Form
      You can pass this arguments to this component as "set" props
      ```
      {
        type: "text",
        name: "username",
        label: "Username or email",
        function: this.handleChange.bind(this),
        placeholder: "Jake the dog",
        id: "Username"
      }
      ```
      - Login.js
      - Register.js
      Forms

    - layouts
      - UserPanelLayout
      The fixed elements which will have all UserPanel subpages

    - MainPageComponents
      There are elements which are included in the main page ( landpage, loginpage, registerpage - named it what you like :) )

    - pages
      The pages, views  of the app

  - img
  - services
  App.js
  index.js
  registerServiceWorker ( default for now, in the future it will be used for the PWA )