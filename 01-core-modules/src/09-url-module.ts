//  https://api.example.com/users?page=2&limit=10

function runUrlDemo(): void {
  const apiUrl = new URL("https://api.example.com/users?page=2&limit=10&sort=latest"); // creating an url object from url string

  console.log(
    apiUrl.href,
    apiUrl.protocol,
    apiUrl.hostname,
    apiUrl.pathname,
    apiUrl.search,
  ); //getting the full url, protocol, hostname, pathname, search

  const page = apiUrl.searchParams.get('page');
  const limit = apiUrl.searchParams.get('limit');
  const sort = apiUrl.searchParams.get('sort');

  console.log(page, limit, sort);

  apiUrl.searchParams.set("page", '10');
  apiUrl.searchParams.set("limit", '25');
  console.log("new url: ", apiUrl.href);

  const queryParams = new URLSearchParams({
    search: "node js",
    page: "1",
    limit: "5"
  });

  console.log(queryParams.toString())

}

runUrlDemo();
