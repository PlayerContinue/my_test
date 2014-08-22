
/*
Create a draggable object
Attribute only
*/

angular.module('draggable',['myApp.services']).
directive('dragBox', ['$sdLog', '$compile', '$window', '$document', '$parse',
    function($sdLog, $compile, $window, $document, $parse) {



        function links($scope, $elem, $attrs, $ctrl, $transclude) {

            var element = angular.element($elem);

            //Add the draggable and position elements
            $elem.attr('draggable', 'true');
            $elem.attr('dragstart', 'function(){event.dataTransfer.setData("text/plain", this.id);}');
            //$elem.attr('ng-style', '{left:position.xpos,top:position.ypos}');
            $elem.attr('style', 'position:absolute;');


        };


        function compileFn(element, attributes) {
            return {
                pre: function(scope, $elem, $attrs, controller, $transclude) {
                    links(scope, $elem, $attrs, controller, $transclude);
                },
                post: function($scope, $elem, $attrs, controller, $transclude) {
                    linker($scope, $elem, $attrs, controller, $transclude);
                }
            }
        }

        function linker($scope, $elem, $attrs, $ctrl, $transclude) {
            var element = angular.element($elem);
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;

            //Evaluate values for what should be done
            var options = $scope.$eval($attrs.dragBox);


            $elem.bind('dragstart',function(event){
                
            });
            //on press
            $elem.on('mousedown', function(event) {
                event.preventDefault();
                startX = event.screenX - element.offset().left;
                startY = event.screenY - element.offset().top;
                $document.on('mousemove', mouseDrag);
                $document.on('mouseup', mouseDrop);
                $document.on('mouseover', mouseOver);
                //Check if a function
                if (angular.isFunction(options.start)) {
                    options.start(event);
                }else if(options.start){
                     throw minErr(" Error: start: " + options.start + " is not a function");
                }
            });


            //on the mouse moving
            function mouseDrag(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                //Fire off function if given value is a function
                if (angular.isFunction(options.move)) {
                    option.move(event);
                }else if(options.move){
                    //Not function, but exists, throw error
                    throw minErr("Error: move: " + options.move + " is not a function");
                }
            }

            //on release
            function mouseDrop(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
                //Check if is a function
                if (angular.isFunction(options.stop)) {
                    options.stop(event);
                }else if(options.stop){
                    //Not a function, but still exists, throw error
                     throw minErr("Error: stop: " + options.stop + " is not a function");
                }
                $document.off('mousemove', mouseDrag);
                $document.off('mouseup', mouseDrop);
                $document.off('mouseover', mouseOver);
            }

            function mouseOver(event) {
                
                //Fire off function if given value is a function
                if (angular.isFunction(options.over)) {
                    options.over(event);
                }else if(options.over){
                    //Not function, but exists, throw error
                    throw minErr("Error: over: " + options.move + " is not a function");
                }
            }

        }





        return {
            restrict: 'A',
            compile: compileFn

        };

    }
]);