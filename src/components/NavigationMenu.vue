<template>
    <n-menu accordion :options="menu" :expanded-keys="expanded_keys" :value="selected" @update:value="menuOnUpdated" @update:expanded-keys="menuOnKeysUpdated" />
</template>

<script>
import { h } from "vue"
import { venia } from '@/api/venia'
import { NMenu, NIcon } from 'naive-ui'

import MaterialIcon from "./icons/MaterialIcon.vue"

const icon = (i) => () => h(<NIcon size="24"/>, null, { default: () => h(i) })

const MenuHeader = {
    label: "Categories",
    key: JSON.stringify({ label: "Home", key: "home" }),
    icon: icon(<MaterialIcon icon="menu" />),
}

function process_tree(data) {
    let result = []
    if (data.children_count > 0) {
        for (var i = 0; i < data.children_count; i++) {
            result.push({
                label: data.children[i].name,
                key: JSON.stringify({label: data.children[i].name, key: data.children[i].uid}),
                children: process_tree(data.children[i])
            })
        }
    } else {
        return {
            label: data.name,
            key: JSON.stringify({label: data.name, key: data.uid}),
        }
    }
    return result
}

/// find path (including root node) to node in non-binary tree with given key
/// stack is used to remember previus nodes
function find_category(menu, key, stack = []) {
    if (menu.key == key) {
        return stack
    }
    if (menu.children) {
        for (var i = 0; i < menu.children.length; i++) {
            let path = find_category(menu.children[i], key, [...stack, menu.children[i]])
            if (path) {
                return path
            }
        }
    }
    return null
}

function find(menu, key) {
    let path = [menu[0], ...find_category(menu[0], key)]
    if (path) {
        let result = []
        for (var i = 0; i < path.length; i++) {
            result.push(path[i].key)
        }
        return result
    }
}

export default {
    name: "NavigationMenu",
    async setup() {
        var categories = await venia.get_categories()

        return {
            default_category: categories.data.categories.items[0]
        }
    },
    methods: {
        menuOnUpdated(value) {
            /// Notify the parent of change
            this.$emit("change", value) 
            this.selected = value
            this.$emit("pathChange", find(this.menu, value))
            
            /// Collapses all menu items after selection if on mobile
            if (window.innerWidth < 960)
                this.expanded_keys = []
        },
        /// To keep track of expanded keys
        menuOnKeysUpdated(value) {
            this.expanded_keys = value
        }
    },
    mounted() {
        this.menu = [{
            ...MenuHeader,
            children: [{
                key: "divider-1",
                type: "divider",
            }, ...process_tree(this.default_category) ]
        }]
    },
    watch: {
        expanded_keys(newVal, oldVal) {
            if (newVal.length > 0) {
                if (newVal.length < oldVal.length) {
                    this.selected = oldVal.filter(val => !newVal.includes(val))[0]    
                } else {
                    this.selected = newVal.filter(val => !oldVal.includes(val))[0]
                }
                if (this.selected != JSON.stringify({ label: "Home", key: "home" })) {
                    this.$emit("change", this.selected) 
                    this.$emit("pathChange", find(this.menu, this.selected))
                }
            }
        }
    },
    data() {
        return { 
            selected: "",
            expanded_keys: [],
            menu: [
                {
                    ...MenuHeader,
                    children: [
                        {
                            label: "Loading...",
                            key: "loading",
                        }
                    ]
                },
                {
                    key: "divider-1",
                    type: "divider",
                }
            ]
        }
    },
    components: {
        NMenu
    },
}
</script>