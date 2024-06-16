document.addEventListener("DOMContentLoaded", async () => {

  let postList = document.getElementById("post-list");

  let posts = await getPosts()

  let postsToLoad = 10;

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  let indexes = []
  while (indexes.length < postsToLoad){
    let index = getRandomIndex(posts.length)
    if (!indexes.includes(index))
      indexes.push(index)
  }

  let spinner = document.getElementById("infinite-spinner");

  // If there's no spinner, it's not a page where posts should be fetched
  if (!spinner) return;

  indexes.forEach(x => appendPost(posts[x],postList))
  spinner.style.display = "none";
});
