export default function configure() {
	if ("serviceWorker" in navigator) {
	    // Setup a listener to track Add to Homescreen events.
	    window.addEventListener('beforeinstallprompt', e => {
          e.userChoice.then(choiceResult => {
            if (typeof ga !== "undefined") {
                ga('send', 'event', 'A2H', choiceResult.outcome, document.title);
            }
          });
	    });
	}        
}
