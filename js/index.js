document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchTerm = event.target.elements.search.value.trim();
  
      if (searchTerm === "") {
        alert("Please enter a search term.");
        return;
      }
  
      try {
        const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            Accept: "application/vnd.github.v3+json"
          }
        });
        const usersData = await usersResponse.json();
        displayUsers(usersData.items);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
      }
    });
  
    function displayUsers(users) {
      userList.innerHTML = "";
      users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="Avatar" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userItem.addEventListener("click", async () => {
          try {
            const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`, {
              headers: {
                Accept: "application/vnd.github.v3+json"
              }
            });
            const reposData = await reposResponse.json();
            displayRepos(reposData);
          } catch (error) {
            console.error("Error fetching user repos:", error);
            alert("Failed to fetch user repositories. Please try again later.");
          }
        });
        userList.appendChild(userItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.full_name}</a>`;
        reposList.appendChild(repoItem);
      });
    }
  });
  