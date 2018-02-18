export default function configure() {
	if ("serviceWorker" in navigator) {
	    // Setup a listener to track Add to Homescreen events.
	    window.addEventListener('beforeinstallprompt', e => {
          e.userChoice.then(choiceResult => {
            if (typeof ga !== "undefined") {
	          ga('send', {
	    		hitType: 'event',
	    		eventCategory: 'A2H',
	    		eventAction: choiceResult.outcome,
	    		eventLabel: document.title,
	    		nonInteraction: true
	  			});
            }
          });
	    });
	}        
}
