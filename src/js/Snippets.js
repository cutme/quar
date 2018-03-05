import Macy from 'macy';

export function grid() {

    const grid = document.getElementsByClassName('js-grid');
    
    let macyInstance = [],
        mobile = false,
        ww = window.innerWidth;

    const init = function() {
        for (let i = 0; i < grid.length; i ++) {
        
            grid[i].className += ' js-macy'+i;
    
            macyInstance[i] = Macy({
                container: '.js-macy'+i,
                columns: 2,
                useOwnImageLoader: true,
                margin: {
                  x: 134,
                  y: 16  
                },
                breakAt: {
                    1024: {
                      margin: {
                        x: 60,
                        y: 16,
                      }
                    }
                    
                }
            });

            document.addEventListener('lazybeforeunveil', function() {
                macyInstance[i].recalculate(true);
            });            
        }        
    }
    
    
    const destroy = function() {
    
        ww = window.innerWidth;
        
        if (ww <= 768 && mobile === false) {
            for (let i = 0; i < grid.length; i ++) {
                if (macyInstance[i] != undefined) {
                    macyInstance[i].remove();
                }
            }

            mobile = true;
        }
        
        if (ww > 768 && mobile === true) {
        
            init();
            
            mobile = false;
        }
    }
    
    window.addEventListener('resize', destroy);
    
    if (ww > 768) {
        init();
        
    }
    
    
};

export function contactform() {

    const form = document.getElementsByClassName('js-contactform')[0],
          fields = form.getElementsByClassName('js-field');

    document.addEventListener('click', function(e) {
        
        // Show placeholder if input empty
        const placeholders = function() {
            for (let i = 0; i < fields.length; i ++) {
                if (fields[i].value.length === 0) {
                    fields[i].parentNode.getElementsByTagName('label')[0].classList.remove('is-active');
                }
            }
        }

        if (e.target.nodeName == 'LABEL') {

            // Check Input/Textarea exist
            if (e.target.parentNode.getElementsByTagName('input')[0] != undefined) {
                e.target.parentNode.getElementsByTagName('input')[0].focus();
            } else {
                e.target.parentNode.getElementsByTagName('textarea')[0].focus();
            }
            
            placeholders();

            e.target.classList.add('is-active');
        }
        
        // Action with click outside the form
        if (e.target.classList.contains('js-contactform') || e.target.classList.contains('o-container')) {
            placeholders();
        }
    });   
};

export function fullHeight() {
	var fullHeight = document.getElementsByClassName('js-fullHeight'),
	    action = function() {
    		var windowHeight = window.innerHeight + 'px';
    
    		if (fullHeight) {
    			for (var i = 0; i < fullHeight.length; i++) {
    				fullHeight[i].style.height = windowHeight;
    			}
    		}
    	};
	
	action();
	
	window.addEventListener( 'resize', action );
};

export function topBar() {

    const el = document.getElementsByClassName('js-bgFadeIn')[0];

    let winPos = (window.pageYOffset || window.scrollY);

    if (el.classList.contains('js-white')) {
        el.style.opacity = 1;
    } else {
        
        function action() {
            winPos = (window.pageYOffset || window.scrollY);
            el.style.opacity = (winPos / 2) * 0.01;
        }

    	window.addEventListener('scroll', action);
    	action();
    }

};

export function nav() {
	
    const action = function(e) {
    
        const nav = document.getElementById('nav'),
    	      top = document.getElementsByClassName('c-top')[0];

            top.classList.toggle('is-opened');
            
            setTimeout(function() {
                nav.classList.toggle('is-visible');
            }, 1);
            
    		e.target.classList.toggle('open');
            e.returnValue = false;
          };
	
    document.addEventListener('click', function(e) {   
    	if (e.target.classList.contains('js-hamburger')) {
            action(e);
    	}
	});
};

export function showOnScroll() {

    const el = document.getElementsByClassName('anim');
    
    const isInView = function(el) {
		var bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
		
		if ( el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) < bottomOfWindow ) {
			return true;
		}
	};
	
	let lastScrollTop = 0;
	
	for (let i = 0; i < el.length; i++) {
	    
		if (isInView(el[i])) {
			el[i].className += ' anim--loaded';
		}
	}
	
	function init() {
	
	    // Check direction of scroll
	   /*
 let st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop){
          // console.log('down');
        } else {
           //console.log('up');
        }
        lastScrollTop = st;
*/
	
		for (let j = 0; j < el.length; j++) {
			//if ( el[i].getAttribute('visible') === null ) {
				let bottomOfObject = el[j].getBoundingClientRect().top + (window.pageYOffset || window.scrollY) + 100,
					bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
				
				if( bottomOfWindow > bottomOfObject ) {
					el[j].classList.add('anim--loaded');

				}
				
				if( bottomOfWindow - 150 < bottomOfObject) {
				    if (el[j].classList.contains('anim--out')) {
    				    el[j].classList.remove('anim--loaded');
    				}
				}
			//}
		}
	}

	window.addEventListener('scroll', init);
	
};


