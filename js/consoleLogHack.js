window.addEventListener('DOMContentLoaded', ()=>{
    // 2. 出力先の要素
    const logArea = document.getElementById('output');

    // 3. console.log をハック
    consoleOutput = function (...args) {
	// HTMLに出力
	const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
	if (logArea) {
	    logArea.innerText += msg + '\n';
	}
    };
});
