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
            
            console.log('s');

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
                        console.log('init');
            init();
            
            mobile = false;
        }
    }
    
    window.addEventListener('resize', destroy);
    
    if (ww > 768) {
        init();            
    }
    
    
};