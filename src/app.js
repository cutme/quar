import css from './sass/style.scss';
import Barba from 'barba';
import lazysizes from 'lazysizes';
import { grid } from './js/Snippets.js';

require('./js/Framework.js');


document.addEventListener("DOMContentLoaded", () => {    
    
    utils.grid();
    utils.fullHeight();
    utils.nav();
    utils.topBar();
    
    Pace.on('done', function() {
        setTimeout(function() {
            utils.showOnScroll();
        }, 1000);
    });
   
    Barba.Prefetch.init();
    Barba.Pjax.start(); 
    
    var HideShowTransition = Barba.BaseTransition.extend({
        
        start: function() {
            Promise.all([
                this.newContainerLoading, 
                this.fadeOut()
            ])
            .then(
                this.fadeIn.bind(this)
            );
        },
  
        fadeOut: function() {
            document.body.classList.remove('pace-done');
             
            return new Promise(function(resolve, reject) {
                window.setTimeout(function() {
                    resolve();
                    
                }, 700);
            });
        },
  
        fadeIn: function() {
            window.scroll(0,0);
            this.done();
        }
    });

    Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
        utils.fullHeight();
        utils.topBar();
        
        //setTimeout(function() {
            
       // }, 4000);
        
    });

    Barba.Pjax.getTransition = function() {
        return HideShowTransition;
    };

    var Homepage = Barba.BaseView.extend({
        namespace: 'homepage',
            onEnter: function() {
                utils.grid();
            },
            onEnterCompleted: function() { },
            onLeave: function() {},
            onLeaveCompleted: function() { }
    });
    
    var Contact = Barba.BaseView.extend({
        namespace: 'contact',
            onEnter: function() {
                utils.contactform();
            },
            onEnterCompleted: function() { },
            onLeave: function() {},
            onLeaveCompleted: function() { }
    });
    
    var Work = Barba.BaseView.extend({
        namespace: 'work',
            onEnter: function() {
                                
            },
            onEnterCompleted: function() {
                utils.grid();
            },
            onLeave: function() {},
            onLeaveCompleted: function() { }
    });
    
    var Services = Barba.BaseView.extend({
        namespace: 'services',
            onEnter: function() {
                utils.grid();
            },
            onEnterCompleted: function() { },
            onLeave: function() {},
            onLeaveCompleted: function() { }
    });
    
    Contact.init();
    Homepage.init();
    Services.init();
    Work.init();


    Barba.Dispatcher.on('newPageReady', function(current, prev, container) {


       

    });
   
});


/*

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
grid();  
history.scrollRestoration = 'manual'; 
});
*/


//



