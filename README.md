# Kolhapur Bazaar

**Name:** Gaurav Sanjay Nikhare  
**Roll Number:** 41  
**Division:** B

## 1. Introduction and objective
Kolhapur Bazaar is an e-commerce website that sells products from Kolhapur: Kolhapuri chappals, masala blends, jaggery and jewellery. The objective is to build a working online store with a cart and order flow, manage it with Git/GitHub, and automate build, deploy and testing with Jenkins.

## 2. Technology stack
| Layer | Tool |
|---|---|
| Frontend | HTML5, CSS3, vanilla JavaScript (cart saved in localStorage) |
| Web server | Nginx (inside Docker) |
| Version control | Git, GitHub |
| DevOps tool | Jenkins (declarative pipeline), Docker |

## 3. Folder structure
```
kolhapur-bazaar/
├── src/            website source (index.html, css/, js/)
├── docs/screenshots/   proof images used in this README
├── Dockerfile      builds the Nginx image
├── Jenkinsfile     CI/CD pipeline
└── README.md
```

## 4. How to run
**Without Docker:** open `src/index.html` in a browser.

**With Docker:**
```bash
docker build -t kolhapur-bazaar .
docker run -d -p 8085:80 --name kolhapur-bazaar kolhapur-bazaar
# open http://localhost:8085
```

## 5. Website screenshots
Home Page

The home page displays Kolhapur Bazaar branding, product categories, and the main shopping section.

Shopping Cart

The shopping cart allows users to view selected products, check the total amount, and proceed to place an order.

CI/CD Deployment

The website is built and deployed using a Jenkins pipeline and Docker container.
## 6. Changes made (5 or more)
TODO: fill the table below with your real commit hashes (`git log --oneline`).

| # | Change | Commit hash | Screenshot |
|---|---|---|---|
| 0 | Initial site: product grid and cart | | |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

## 7. Git and GitHub workflow
```bash
git init
git add .
git commit -m "Initial commit: product grid and cart"
git branch -M main
git remote add origin https://github.com/<your-username>/kolhapur-bazaar.git
git push -u origin main
# for every change
git add .
git commit -m "feat: <what changed>"
git push
git log --oneline
```
Repository link: TODO

## 8. Jenkins integration
TODO: add screenshots of each step below.
1. Install Jenkins and the Git, Pipeline and Docker Pipeline plugins.
2. Make sure the `jenkins` user can run Docker (`sudo usermod -aG docker jenkins`, then restart Jenkins).
3. Create a new item, choose **Pipeline**, name it `kolhapur-bazaar`.
4. Under Pipeline, select **Pipeline script from SCM**, SCM = Git, paste the GitHub URL, branch `*/main`, script path `Jenkinsfile`.
5. Click **Build Now**.
6. Pipeline stages: Checkout, Validate files, Build Docker image, Deploy container, Smoke test.
7. Open `http://localhost:8085` to see the site deployed by Jenkins.

Result screenshots: TODO (pipeline stage view, console output "Finished: SUCCESS", deployed site).
