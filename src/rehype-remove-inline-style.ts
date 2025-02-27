import {visit} from 'unist-util-visit'

export default function rehypeRemoveStyleAttribute() {
    return function (tree) {
        visit(tree, 'element', function (node, index, parent) {
            if(node.tagName.toLowerCase() === 'style' || node.tagName.toLowerCase() === 'svg' || node.tagName.toLowerCase() === 'footer' || node.tagName.toLowerCase() === 'h1') {
                parent.children.splice(index, 1)
                return index
            }
            let value = node.properties.style
            if (typeof value === 'string') {
                node.properties.style =  undefined
            }
        })
    }
}