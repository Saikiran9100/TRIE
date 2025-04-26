class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let ch of word) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
        }
        node.isEndOfWord = true;
    }

    getAllWordsWithPrefix(prefix) {
        let node = this.root;
        for (let ch of prefix) {
            if (!node.children[ch]) return [];
            node = node.children[ch];
        }
        let words = [];
        this._collectWords(node, prefix, words);
        return words;
    }

    _collectWords(node, prefix, words) {
        if (node.isEndOfWord) words.push(prefix);
        for (let ch in node.children) {
            this._collectWords(node.children[ch], prefix + ch, words);
        }
    }
}

const trie = new Trie();

function insertWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (word) {
        trie.insert(word);
        document.getElementById("wordInput").value = "";
        alert(`Inserted: ${word}`);
    }
}

function searchPrefix() {
    const prefix = document.getElementById("prefixInput").value.trim();
    const results = trie.getAllWordsWithPrefix(prefix);
    const resultList = document.getElementById("resultList");
    
    resultList.innerHTML = "";

    if (prefix === "") return;

    if (results.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No matching words";
        li.style.color = "red";
        resultList.appendChild(li);
    } else {
        results.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            resultList.appendChild(li);
        });
    }
}
