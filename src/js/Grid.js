import Macy from 'macy';

export function grid() {

    const grid = document.getElementsByClassName('js-grid');
    
    let macyInstance = [],
        mobile = false,
        ww = window.innerWidth;
        
    if (ww <= 768) {
        mobile = true;
    }

    const init = function() {
        for (let i = 0; i < grid.length; i ++) {

            if (!grid[i].classList.contains('js-macy'+i)) {
                grid[i].className += ' js-macy'+i;
            }
    
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
            
            macyInstance[i].reInit();
        }        
        
        console.log('macy init');
    }
    
    
    const destroy = function() {
    
        
        
        setTimeout(function() {
            ww = window.innerWidth;
            
            if (ww <= 768) {
                if (mobile === false) {
    
                    for (let i = 0; i < grid.length; i ++) {
                        if (macyInstance[i] != undefined) {
                            macyInstance[i].remove();
                        }
                    }
                    
                    mobile = true;
                    console.log('destroy');
                }
            }
            
            if (ww > 768) {
                if (mobile === true) {
                    init();
                    mobile = false;
                }
            }
        }, 200);
        
        
    }
    
    window.addEventListener('resize', destroy);
    
    if (ww > 768) {
        if (mobile === false) {
            init();
        }         
    }
    
    
};