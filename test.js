const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// We need to polyfill DOMContentLoaded event for JSDOM execution
const scriptContent = fs.readFileSync('app.js', 'utf8');
const scriptElement = document.createElement('script');
scriptElement.textContent = scriptContent;
document.body.appendChild(scriptElement);


// Trigger DOMContentLoaded manually if it's not automatically fired by jsdom this way
const event = document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
window.document.dispatchEvent(event);


setTimeout(() => {
    try {
        const input = document.getElementById('todo-input');
        const form = document.getElementById('todo-form');
        const list = document.getElementById('todo-list');

        // Test 1: Add a todo
        input.value = 'Buy milk';
        form.dispatchEvent(new window.Event('submit'));

        if (list.children.length !== 1) throw new Error(`Test 1 Failed: Expected 1 item, got ${list.children.length}`);
        if (!list.children[0].textContent.includes('Buy milk')) throw new Error('Test 1 Failed: Incorrect text');
        console.log('Test 1 Passed: Add a todo');

        // Test 2: Toggle a todo
        const checkbox = list.children[0].querySelector('input[type="checkbox"]');
        checkbox.checked = true;
        checkbox.dispatchEvent(new window.Event('change'));

        if (!list.children[0].classList.contains('completed')) throw new Error('Test 2 Failed: Item not marked as completed');
        console.log('Test 2 Passed: Toggle a todo');

        // Test 3: Delete a todo
        const deleteBtn = list.children[0].querySelector('.delete-btn');
        deleteBtn.click();

        if (list.children.length !== 0) throw new Error(`Test 3 Failed: Expected 0 items, got ${list.children.length}`);
        console.log('Test 3 Passed: Delete a todo');

        console.log('All tests passed successfully!');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}, 100);
