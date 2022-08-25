class VeniaAPI {
    BASE_URL = 'https://venia.magento.com/graphql'
    FALLBACK_URL = "https://magento.nightskystudio.workers.dev/"
    CORS = false

    /// Due to Cross-Origin-Resource-Sharing policy on the BASE_URL
    /// we are using a private Cloudflare-based proxy to make requests to the BASE_URL
    setCors(value) {
        this.CORS = value
        return this
    }

    Options = {
        method: "POST",
    }

    async get_categories(filters = "", page_size = 10, current_page = 1) {
        if (this.CORS) {
            const query = `{ categories( ${filters != "" ? `filters: ${filters} ` : "" }pageSize: ${page_size} currentPage: ${current_page} ) { total_count items { uid level name path children_count children { uid level name path children_count children { uid level name path children_count } } } page_info { current_page page_size total_pages } } }`

            let response = await fetch(this.BASE_URL, {
                ...this.Options,
                body: JSON.stringify({ query: query })
            })
            return await response.json()

        } else {
            let response = await fetch(this.FALLBACK_URL, {
                ...this.Options,
                body: JSON.stringify({ query: "get_categories", params: { filters: filters, page_size: page_size, current_page: current_page } })
            })
            return await response.json()
        }
    }

    async get_products(filters = "", page_size = 100, current_page = 1) {
        if (this.CORS) {
            const query = `{ products(${filters != "" ? `filter: ${filters}` : "" } pageSize: ${page_size} currentPage: ${current_page} ) { total_count items { uid name sku image { url label } description { html } stock_status price_range { minimum_price { regular_price { value currency } } } } page_info { current_page page_size total_pages } } }`

            let response = await fetch(this.BASE_URL, {
                ...this.Options,
                body: JSON.stringify({ query: query })
            })
            return await response.json()
        } else {
            let response = await fetch(this.FALLBACK_URL, {
                ...this.Options,
                body: JSON.stringify({ query: "get_products", params: { filters: filters, page_size: page_size, current_page: current_page } })
            })
            
            return await response.json()
        }
    }
}

export const venia = new VeniaAPI().setCors(false)