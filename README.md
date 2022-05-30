<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Netlify Status](https://api.netlify.com/api/v1/badges/936f5ea9-a3e4-4144-b1ea-cdd5430b1958/deploy-status)](https://app.netlify.com/sites/celadon-donut-2d0bd2/deploys)



<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/hcduffey/mtg-react-client">
    <img src="public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<div align="center">
  
<h3 align="center">MTG: Deckbuilder</h3>

  <p align="center">
    An API-driven SPA that provides users with the ability to create, import, export and manage Magic: The Gathering decks using the MTG API.
    <br />
    <a href="https://github.com/hcduffey/mtg-react-client"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://celadon-donut-2d0bd2.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/hcduffey/candyland/issues">Report Bug</a>
    ·
    <a href="https://github.com/hcduffey/mtg-api">Explore Backend API code</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](images/screen_shot.png)

MTG: Deckbuilder is a single-page application that interacts with an RESTful API to perform CRUD operations on "Deck" resources. A "Deck" resource represents a Magic: the Gathering deck that is comprised of 60 or more Magic: the Gathering cards. Users can create a deck and add Magic cards to it using the MTG API. There is also an import/export feature that allows users to import from or export to sites like mtggoldfish.com or the online Magic: Arena game.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [https://reactjs.org/](ReactJS)
* [https://fontawesome.com/v5/docs/web/use-with/react](FontAwesome)
* [https://react-bulma.dev/en](Bulma)
* [https://magicthegathering.io/](MTGAPI)


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

The client requires the [https://github.com/hcduffey/mtg-api](MTGAPI) to work.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hcduffey/mtg-react-client.git
   ```
2. Install the dependencies
   ```sh
   npm i
   ```
3. Run it
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You must first create an account by clicking the sign-up button and providing a username and password. Note: there isn't a requirement to provide an e-mail address or any other personal information to create an account.

You may then use the credentials you provided to login.

### Creating Decks

Click the 'Decks' link in the Navbar to begin creating a deck. From there, click the '+' button to create a new deck. Enter a name of the deck, and optionally copy/paste exported cards from an existing deck in mtggoldfish.com or Magic Arena.

### Adding/Removing Cards

Click the deck that was created to view its card contents. Use the search bar on the right-hand side of the screen to search for cards by name and add to the deck. Click the 'x' next to a card to decrease the quantity of that card in your deck (or to remove it entirely if the quantity is reduced to zero).

You can also change the name of the deck by clicking the edit button next to the deck name on this screen.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Create a "share" capability to allow users to share decks they've created with other users
- [ ] Add a colloborate function to allow multiple users to add/remove cards in a deck at the same time

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Cliff Duffey - [@cliffduffey2](https://twitter.com/cliffduffey2)

Project Link: [https://github.com/hcduffey/mtg-react-client](https://github.com/hcduffey/mtg-react-client)

API Project Link: [https://github.com/hcduffey/mtg-api](https://github.com/hcduffey/mtg-api)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/hcduffey/mtg-react-client.svg?style=for-the-badge
[contributors-url]: https://github.com/hcduffey/mtg-react-client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hcduffey/mtg-react-client.svg?style=for-the-badge
[forks-url]: https://github.com/hcduffey/mtg-react-client/network/members
[stars-shield]: https://img.shields.io/github/stars/hcduffey/mtg-react-client.svg?style=for-the-badge
[stars-url]: https://github.com/hcduffey/mtg-react-client/stargazers
[issues-shield]: https://img.shields.io/github/issues/hcduffey/mtg-react-client.svg?style=for-the-badge
[issues-url]: https://github.com/hcduffey/mtg-react-client/issues
[license-shield]: https://img.shields.io/github/license/hcduffey/mtg-react-client.svg?style=for-the-badge
[license-url]: https://github.com/hcduffey/mtg-react-client/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cduffey
[product-screenshot]: public/images/screenshot.png
