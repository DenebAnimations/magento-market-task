class VeniaAPI {
    BASE_URL = 'https://venia.magento.com/graphql'

    Options = {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }

    async get_categories(filters = "", page_size = 10, current_page = 1) {
        const query = `{ categories( ${filters != "" ? `filters: ${filters} ` : "" }pageSize: ${page_size} currentPage: ${current_page} ) { total_count items { uid level name path children_count children { uid level name path children_count children { uid level name path children_count } } } page_info { current_page page_size total_pages } } }`

        var response = await fetch(this.BASE_URL, {
            ...this.Options,
            body: JSON.stringify({ query: query })
        })
        return await response.json()
    }

    async get_products(filters = "", page_size = 100, current_page = 1) {
        const query = `{ products(${filters != "" ? `filter: ${filters}` : "" } pageSize: ${page_size} currentPage: ${current_page} ) { total_count items { uid name sku image { url label } description { html } stock_status price_range { minimum_price { regular_price { value currency } } } } page_info { current_page page_size total_pages } } }`

        var response = await fetch(this.BASE_URL, {
            ...this.Options,
            body: JSON.stringify({ query: query })
        })
        return await response.json()
    }
}

export const venia = new VeniaAPI()