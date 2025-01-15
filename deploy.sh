git add .
git commit -m "Deploy" 
git push origin main
git subtree pull --prefix dist origin gh-pages
git subtree push --prefix dist origin gh-pages