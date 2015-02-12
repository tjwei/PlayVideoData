// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file
 * (and should create it if it does not exist).
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 * Example :
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    $([IPython.events]).on('app_initialized.NotebookApp', function(){
 *        IPython.toolbar.add_buttons_group([
 *            {
 *                 'label'   : 'run qtconsole',
 *                 'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                 'callback': function () {
 *                     IPython.notebook.kernel.execute('%qtconsole')
 *                 }
 *            }
 *            // add more button here if needed.
 *            ]);
 *    });
 *
 * Example :
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */

// LIVE_REVEAL START

// to prevent timeout
requirejs.config({
    waitSeconds: 60
});

function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
    $(resizeElement).css('width', "50%");
    dragElement.on("mousedown vmousedown", function(e) {
        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        var dragWidth = dragElement.outerWidth(),
            xPosition = dragElement.offset().left + dragWidth - e.pageX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth(),
            minLeft = containerOffset-dragWidth/2,
            maxLeft = containerOffset+containerWidth-dragWidth/2;
            
        
        dragElement.parents().on("mousemove vmousemove", function(e) {
            leftValue = e.pageX + xPosition - dragWidth;
            
            if(leftValue < minLeft ) {
                leftValue = minLeft;
            } else if ( leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
            
            $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });

            $('.resizable').css('width', widthValue); 

            
        }).on("mouseup vmouseup", function(e){
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}


$([IPython.events]).on('app_initialized.NotebookApp', function(){

     require(['nbextensions/livereveal/main'],function(livereveal){
       // livereveal.parameters('theme', 'transition', 'fontsize', static_prefix);
       //   * theme can be: simple, sky, beige, serif, solarized
       //   (you will need aditional css for default, night, moon themes).
       //   * transition can be: linear, zoom, fade, none
       livereveal.parameters('sky2', 'linear');
       console.log('Live reveal extension loaded correctly');
     });

});

// LIVE_REVEAL END
