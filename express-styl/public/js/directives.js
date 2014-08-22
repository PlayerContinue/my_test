'use strict';

/* Directives */


angular.module('myApp.directives', ['ngAnimate']).
directive('appVersion', ['$sdLogging', 'version',
    function($sdLogging, version) {

        return function(scope, elm, attrs) {
            elm.text(version);
            $sdLogging.log('test');
        };
    }
])

/**
 * [description] Create a table
 * example: <sd-table-all repeat="list in lists 3 x 3"></sd-table-all>
 * @param  {[type]} $log
 * @param  {[type]} $parse
 * @param  {[type]} $animate)       {        var sdTableAllMinErr = minErr('sdTableAll');                                                                                  $log.log('test');                  function link($scope, $elem, $attrs, controller, $transclude) {                          var        expression =    $attrs.repeat;                                                           var match
 * @param  {[type]} lhs
 * @param  {[type]} rhs
 * @param  {[type]} numRows
 * @param  {[type]} numCols
 * @param  {[type]} valueIdentifier
 * @param  {[type]} keyIdentifier;                                   match                 = expression.match(/^s*(.+)s+ins+(.*?)s*(s+([1-9]+)?s+bys+([1-9]+)?)?s*$/);                             if (!match) {                                                                        throw 'Expected expression in         form of             "_item_ in _collection_ # by #", but got {0} instead';                    }            lhs = match[1];            rhs = match[2];            numRows = match[4];            numCols = match[5];            valueIdentifier = match[1];            keyIdentifier = match[2];            if (numRows === 0 && numCols === 0
 * @return {[type]}
 */
.directive('sdTableAll', ['$log', '$parse', '$animate',
    function($log, $parse, $animate) {
        var sdTableAllMinErr = minErr('sdTableAll');
        var NG_REMOVED = '$$NG_REMOVED';

        function link($scope, $elem, $attrs, controller, $transclude) {
            var expression = $attrs.repeat;
            var match, lhs, rhs, numRows, numCols, valueIdentifier, keyIdentifier, trackByExpGetter, trackByIdObjFn, trackByIdFn, lastBlockMap,
                hashFnLocals = {
                    $id: key
                },
                key = function(key) {
                    return key;
                }
            match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+([0-9]+)?\s+by\s+([0-9]+)?)?\s*$/);
            if (!match) {
                throw 'Expected expression in form of "_item_ in _collection_ # by #", but got {0} instead';
            }

            lhs = match[1];
            rhs = match[2];
            numRows = match[4];
            numCols = match[5];

            valueIdentifier = match[1];
            keyIdentifier = match[2];

            trackByIdFn = function(key, value, index) {
                /* if (keyIdentifier) {
                    hashFnLocals[keyIdentifier] = key;
                }
                hashFnLocals[valueIdentifier] = value;
                hashFnLocals.$index = index;
                return trackByExpGetter($scope, hashFnLocals);*/
                return key;
            }

            trackByIdObjFn = function(key) {
                return key;
            }
            lastBlockMap = {};
            $scope.$watchCollection(rhs, function(collection) {
                var block, nextBlockOrder = [],
                    trackById, rowIndex, colIndex, key, length, previousElem = $elem,
                    build, value, childScope, nextBlockMap = {},
                    lastTD, lastRow, table, collectionKeys = [],
                    index, elementsToRemove;

                length = nextBlockOrder.length = collection.length;
                //locate all existing items
                for (index = 0; index < length; index++) {
                    key = (collection === collectionKeys) ? index : collection[index];
                    value = collection[key];
                    trackById = trackByIdFn(key, value, index);
                    //locate existing items
                    if (lastBlockMap.hasOwnProperty(trackById)) {
                        block = lastBlockMap[trackById];
                        delete lastBlockMap[trackById];
                        nextBlockMap[trackById] = block;
                        nextBlockOrder[index] = block;
                    } else if (nextBlockMap.hasOwnProperty(trackById)) {
                        //restore the lastBlockMap
                        angular.forEach(nextBlockOrder, function(block) {
                            if (block && block.scope) {
                                lastBlockMap[block.id] = block;
                            }
                        });
                    } else {
                        nextBlockOrder[index] = {
                            id: trackById
                        };
                        nextBlockMap[trackById] = false;
                    }
                }
                //remove existing item
                for (key in lastBlockMap) {
                    if (lastBlockMap.hasOwnProperty(key)) {
                        block = lastBlockMap[key];
                        elementsToRemove = getBlockElements(block.clone);
                        $animate.leave(elementsToRemove);
                        forEach(elementsToRemove, function(element) {
                            element[NG_REMOVED] = true;
                        })
                        block.scope.$destroy();
                    }
                }


                build();

                function build() {
                    //Create KeyList
                    for (key in collection) {
                        if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                            collectionKeys.push(key);
                        }
                    }




                    if (numRows == 0) {
                        //Number of rows determined by columns
                        numRows = length / numCols;
                    } else if (numCols == 0) {
                        //Number of cols determined by rows
                        numCols = length / numRows;
                    }


                    for (rowIndex = 0, index = 0; rowIndex < numRows; rowIndex++) {

                        //Add new row
                        lastRow = document.createElement('tr');

                        angular.element(previousElem).append(angular.element(lastRow));

                        for (colIndex = 0; colIndex < numCols; colIndex++) {
                            key = (collection === collectionKeys) ? index : collectionKeys[index];
                            value = collection[key];
                            block = nextBlockOrder[index];

                            if (block.scope) {
                                childScope = block.scope;
                            }
                            //Create new scope containing values
                            childScope = $scope.$new();
                            childScope.rowIndex = rowIndex;
                            childScope.colIndex = colIndex;
                            if (collectionKeys[index]) {
                                childScope[valueIdentifier] = collection[collectionKeys[index++]];
                            } else {
                                childScope[collectionKeys[rowIndex * colIndex]] = '';
                            }
                            //Add new Column
                            $transclude(childScope, function(clone) {
                                lastTD = document.createElement('td');
                                clone.scope = childScope;
                                clone[clone.length++] = document.createComment(' end ngRepeat: ' + expression + ' ');
                                angular.element(lastRow).append(angular.element(lastTD));
                                angular.element(lastTD).append(angular.element(clone));
                            });
                        }

                    }

                }
            });

        }

        return {
            restrict: 'E',
            transclude: 'true',
            replace: true,
            link: link,
            template: '<table></table>'
        };
    }
]).
directive("helloWorld", ['$log', '$compile',
    function($log, $compile) {
        var newCol = [];
        var HW_REMOVED = "HW_REMOVED"

        function link($scope, $elem, $attrs, controller, $transclude, newCol) {
            var expression = $attrs.helloWorld;
            var match, lhs, rhs, numRows, numCols,
                valueIdentifier, rowIdentifier, previousElem = angular.element($elem),
                length, previousBuild = {},
                trackByIdFn, lastblockMap = {},
                zeroLength, previousRow, previousOrder = {},
                firstRow;


            match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+([0-9]+)?\s+by\s+([0-9]+)?)?\s*$/);

            if (!match) {
                throw minErr('Failure');
            }


            lhs = match[1];
            rhs = match[2];
            valueIdentifier = match[1];
            rowIdentifier = "currentList";
            numRows = match[4];
            numCols = match[5];
            length = $scope[rhs].length;

            if (numRows === 0 && numCols === 0) {
                throw minErr('Expected n x m, but got 0 x 0')
            } else if (numRows == 0) {
                zeroLength = 'rows';
            } else if (numCols == 0) {
                zeroLength = 'cols';
            }

            trackByIdFn = function(key, value, index) {
                return key;
            }

            //********************************************
            //-----------scope watch----------------------
            //********************************************

            $scope.$watchCollection(rhs, function(collection) {
                var indexRows, indexCols, index, childScope, rowArrayList, key, newRow,
                    collectionKeys = [],
                    nextRow, nextCol, previousCol,
                    value, trackById, block, colScope, nextBuild = [],
                    elementsToRemove, newOrder;
                var newCol = [];
                $log.log('Gone through');
                //Collect keys into an array
                for (key in collection) {
                    if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                        collectionKeys.push(key);
                    }
                }

                length = collection.length;
                if (zeroLength == 'rows') {
                    numRows = Math.ceil(length / numCols);
                } else if (zeroLength == 'cols') {
                    numCols = Math.ceil(length / numRows);
                }

                $log.log('rows ' + numRows + ' cols ' + numCols);
                //locate existing items
                for (var i = 0; i < length; i++) {
                    key = collectionKeys[i];
                    value = collection[key];
                    trackById = trackByIdFn(key, value, i);
                    if (previousBuild.hasOwnProperty(trackById)) {
                        block = previousBuild[trackById];
                        delete previousBuild[trackById];
                        nextBuild[trackById] = block;
                    } else if (nextBuild.hasOwnProperty(trackById)) {
                        //Fill in later
                        angular.forEach(nextBuild, function(block) {
                            if (block && block.scope) previousBuild[block.id] = block;
                        });
                    } else {
                        //New block, add to list
                        nextBuild[i] = {
                            id: trackById
                        };
                    }
                }

                //Remove old objects
                for (key in previousBuild) {
                    if (previousBuild.hasOwnProperty(key)) {
                        block = previousBuild[key];
                        elementsToRemove = getBlockElements(block.clone);
                        $animate.leave(elementsToRemove);
                        angular.forEach(elementsToRemove, function(element) {
                            element[HW_REMOVED] = true;
                            block.scope.$destroy();
                        })
                    }
                }
                previousRow = firstRow;

                while (previousRow && angular.element(previousRow).children().length == numCols) {
                    $log.log(previousRow.children().length);
                    previousRow = previousRow.nextSibling;
                }

                //Create a new row 
                for (indexRows = 0, index = 0; indexRows < numRows; indexRows++) {
                    childScope = $scope.$new();
                    rowArrayList = [];
                    $log.log('1');
                    if (previousRow && angular.element(previousRow).children().length < numCols) {
                        nextRow = previousRow;
                        $log.log('2');
                    } else if (previousRow && previousRow.nextSibling) {
                        nextRow = previousRow.nextSibling;
                        //Previous Row has empty slots
                        $log.log('3');

                    } else {
                        //Otherwise
                        nextRow = angular.element(document.createElement('tr'));
                    }
                    //Create array containing rows values
                    for (indexCols = 0; indexCols < numCols && index < length; indexCols++) {
                        rowArrayList.push(collection[collectionKeys[index]]);
                        index++;
                    }
                    //Create Row Scope
                    childScope[rowIdentifier] = rowArrayList;
                    childScope.rowIndex = indexRows;

                    //Create Rows full of columns
                    for (var i = 0; i < rowArrayList.length; i++) {
                        block = nextBuild[index - rowArrayList.length + i];

                        if (block.scope) {
                            colScope = block.scope;
                            nextCol = rowArrayList[i];
                            do {
                                nextCol = nextCol.nextSibling;
                            } while (nextCol && nextCol[HW_REMOVED]);
                        } else {
                            colScope = childScope.$new();
                        }
                        colScope[lhs] = childScope[rowIdentifier][i];
                        colScope["rowIndex"] = indexRows;
                        colScope["colIndex"] = i;
                        colScope["index"] = index - rowArrayList.length + i;
                        if (!block.scope) {
                            //Build a new row
                            $transclude(colScope, function(clone) {
                                clone[clone.length++] = document.createComment(' end helloWorld: ' + expression + ' ');

                                var currentNewCol = angular.element(document.createElement('td'));

                                currentNewCol.append(clone);

                                currentNewCol.scope = colScope;

                                block.scope = colScope;

                                if (previousCol) {
                                    previousCol = currentNewCol;
                                    nextCol = previousCol.nextSibling;
                                } else {
                                    nextRow.append(currentNewCol);
                                }
                                previousCol = nextCol;

                                //Set nextBuild as block
                                nextBuild[block.id] = block;
                            })
                        }
                    }
                    if (previousElem.children().length == 0) {
                        firstRow = nextRow;
                    }
                    previousElem.append(nextRow);


                    previousRow = nextRow;
                }

                previousBuild = nextBuild;
            });


        }

        function compileFn(element, attributes) {
            return {
                pre: function(scope, $elem, $attrs, controller, $transclude) {
                    link(scope, $elem, $attrs, controller, $transclude);
                },
                post: function($scope, $elem, $attrs, controller, $transclude) {


                }
            }
        }

        function findEmptySpaceInRows(firstRow, numCols) {
            var previousRow = angular.element(firstRow);


            $log.log(previousRow);
            return previousRow;

        }

        return {
            restrict: 'A',
            transclude: 'true',
            terminal: true,
            priority: 1000,
            scope: false,
            replace: true,
            compile: compileFn,
            template: '<table></table>'
        };
    }

]).
directive('tableRepeatRow', ['$log',
    function($log) {

        function postLink($scope, $elem, $attrs, $ctrl, $transclude) {

        }

        return {
            restrict: 'E',
            terminal: true,
            priority: 1000,
            template: '<tr ng-repeat="">goal</tr>',
            compile: {
                pre: function($scope, $elem, $attrs, $ctrl, $transclude) {
                    $log.log('list' + $scope.currentList);
                    $attrs["ng-repeat"] = 'misc in currentList';
                    return postLink;
                }
            },
            replace: true,
            transclude: 'true'
        };



    }
]);

function minErr(test) {
    return test;
}