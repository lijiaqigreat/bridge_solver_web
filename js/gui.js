
function wpbdg_update_geometry() {
    /* Some orientation changes leave the scroll position at something
     * that isn't 0,0. This is annoying for user experience. */
    scroll(0, 0);

    /* Calculate the geometry that our content area should take */
    var header = $("#wpbd_header");
    var content = $("#wpbd_content");
    var viewport_height = $(window).height();
    
    var content_height = viewport_height - header.outerHeight();
    
    /* Trim margin/border/padding height */
    content_height -= (content.outerHeight() - content.height());
    content.height(content_height);
    //$(".wpbd_row").css("height",content_height);
    wpbdg.cv1.height=0;
    wpbdg.updateFlag(0);
    wpbdg.update();
    console.debug(content_height);
}

function wpbdg_getEntity(){
    //TODO get single nearest entity
    
}
function wpbdg_tap(e){
    wpbdg.updateNewP(e);
    var element=wpbdg.bridge.getNearestEntity(wpbdg.newP,2);  
    console.debug(element);
    if(element!=null){
        element.selected^=true;
        wpbdg.updateFlag(2);
        wpbdg.update();
    }
}
function wpbdg_doubletap(e){
    var element=wpbdg.bridge.getNearestEntity(wpbdg.newP);  
    wpbdg.bridge.deselectAll();
    if(element!=null){
        element.selected=true;
    }
    wpbdg.updateFlag(2);
    wpbdg.update();
}
function wpbdg_release(e){
    if(wpbdg.drag){
        if(wpbdg.hold){
            var x=wpbdg.newP.x;
            var y=wpbdg.newP.y;
            wpbdg.bridge.getBoxEntities(x,y,x-wpbdg.deltaP.x,y-wpbdg.deltaP.y).forEach(function(e){
                e.selected=true;
            });
            wpbdg.updateFlag(2);
        }else{
            //TODO move joint
            var order=wpbdg.bridge.tryMove(wpbdg.deltaP);
            wpbdg.manager.doOrder(order);
            wpbdg.updateFlag(1);
        }
    }
    wpbdg.deltaP.x=0;
    wpbdg.deltaP.y=0;
    wpbdg.hold=false;
    wpbdg.drag=false;
    wpbdg.update();
}
function wpbdg_hold(e){
    wpbdg.hold=true;
    wpbdg.bridge.deselectAll();
    wpbdg.updateNewP(e);
    wpbdg.updateFlag(2);
    wpbdg.update();
}
function wpbdg_drag(e){
    console.debug(e);
    wpbdg.drag=true;
    wpbdg.updateNewP(e);
    wpbdg.updateDeltaP(e);
    
    if(wpbdg.hold==true){
        //update box
    }else{
        //draw skeleton
    }
    //both case need flag 2
    wpbdg.updateFlag(2);
    wpbdg.update();
}
