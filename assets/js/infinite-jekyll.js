/**
 * This script fetches more posts when the user scrolls to the bottom of the page,
 * and disables the fetching when there are no more posts available to load.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Get the spinner element and the list of posts
  const spinner = document.getElementById("infinite-spinner");
  const postList = document.getElementById("post-list");

  let isFetchingPosts = false;

  // Set how many posts to load each time
  const postsToLoad = 10;

  // If there's no spinner, it's not a page where posts should be fetched
  if (!spinner) return;

  // Get the list of posts to display
  let posts = await getPosts();

  // If there aren't any more posts available to load than already visible,
  // disable fetching
  if (posts.length <= postsToLoad + postList.childElementCount) disableFetching();

  // Function to load more posts if close to the end of the page
  window.addEventListener("scroll", fetchPostsIfNeeded);

  /**
   * Fetch more posts when close to the bottom of the page if there are
   * still posts to load.
   */
  function fetchPostsIfNeeded() {
    // If there are no more posts to load or if we're already fetching,
    // do nothing
    if (
      postList.childElementCount >= posts.length ||
      isFetchingPosts
    ) return;

    // Calculate how far the user is from the bottom of the page
    const distanceToBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY);

    // If the user is within 200 pixels of the bottom of the page,
    // fetch more posts
    if (distanceToBottom < 200) fetchPosts();
  }

  /**
   * Fetch more posts from the server and append them to the page.
   */
  async function fetchPosts() {
    // Set a flag to indicate that we're fetching posts
    isFetchingPosts = true;

    // Get the posts to append
    const postsToAppend = posts.slice(
      postList.childElementCount,
      postList.childElementCount + postsToLoad
    );

    // Append each post to the page
    for (const post of postsToAppend) appendPost(post, postList);

    // Clear the flag to indicate that we're not fetching posts
    isFetchingPosts = false;

    // If there are no more posts to load, disable fetching
    if (postList.childElementCount >= posts.length) disableFetching();
  }

  /**
   * Disable fetching more posts when there are no more posts available.
   */
  function disableFetching() {
    // Remove the spinner element
    spinner.remove();

    // Stop listening for scroll events
    window.removeEventListener("scroll", fetchPostsIfNeeded);
  }
});
