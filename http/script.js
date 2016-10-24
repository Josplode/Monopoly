var $ui;
var uiWidth, uiHeight;

var $card;
var cardWidth, cardHeight;

var $menu;
var $menuToggle;

var $join;
var $joinBackground;
var $joinName;
var $joinToken;

$(document).ready(function() {
	
	// ui
	$ui = $('#ui');
	uiWidth = $ui.width();
	uiHeight = $ui.height();
	var uiOffset = $ui.offset();
	uiOffsetLeft = uiOffset.left;
	uiOffsetTop = uiOffset.top;
	
	// card
	$card = $('#card');
	cardWidth = $card.width();
	cardHeight = $card.height();
	
	// menu
	$menu = $('#menu');
	$menuToggle = $('#menu-toggle');
	
	// join
	$join = $('#join');
	$joinBackground = $('#join-background');
	$joinName = $('#join-name');
	$joinToken = $('#join-token');
});

function update($scope) {
	$.getJSON('state', function(json) {
		$scope.state = json;
		$scope.$apply();
		
		setTimeout(function() {
			update($scope)
		}, 1000);
	});
}

var app = angular.module('monopolyApp', []);
app.controller('monopolyController', function($scope) {
	
	$scope.cardHover = false;
	$scope.cardHeaderStyle = {'background':'white','color':'black'};
	
	update($scope);
	
	$scope.getOp = function(path, callback) {
		$.getJSON(path, function(json) {
			$scope.state = json;
			$scope.$apply();
			
			if (callback != undefined) {
				callback(true);
			}
		})
		.fail(function(json) {
			if (callback != undefined) {
				callback(false);
			}
		});
	}
	
	$scope.postOp = function(path, data, callback) {
		$.post(path, data, function(json) {
			$scope.state = json;
			$scope.$apply();
			
			if (callback != undefined) {
				callback(true);
			}
		}, 'json')
		.fail(function() {
			if (callback != undefined) {
				callback(false);
			}
		});
	}
	
	$scope.toggleMenu = function() {
		
		if ($menu.is(':visible')) {
			$menu.animate({left:'-300px'}, 100, 'swing', function() {
				// hide after animation is complete
				$menu.hide();
			});
			$menuToggle.animateRotate(90, 0, 100);
		}
		else {
			$menu.animate({left:'0px'}, 100, 'swing');
			$menu.show();
			$menuToggle.animateRotate(0, 90, 100);
		}
	}
	
	// Used a short name so the html isn't as bad
	$scope.card = function($event) {
		if ($scope.cardHover == true) {
			return;
		}
		
		var isTile = $.isNumeric($event.target.id) ^ ($event.type == 'mouseleave');
		if (isTile) {
			var c = $event.target.id;
			$scope.selected = $scope.state.board.tiles[c];
		}
		else {
			$scope.selected = null;
			return;
		}
		
		if ($scope.selected == null) return;
		
		switch ($scope.selected.type) {
			case 'PROPERTY':
		
				// Configure card style
				var color = $scope.selected.color;
				$scope.cardHeaderStyle.background = color;

				// invert the dark blue ones
				$scope.cardHeaderStyle.color = color == '#0072bb' ? 'white' : 'black';
				
				break;
			case 'RAILROAD':
				// Configure card style
				var color = $scope.selected.color;
				$scope.cardHeaderStyle.background = color;

				// invert the dark blue ones
				$scope.cardHeaderStyle.color = color == '#0072bb' ? 'white' : 'black';
				break;
			case 'UTILITY':
				// Configure card style
				var color = $scope.selected.color;
				$scope.cardHeaderStyle.background = color;

				// invert the dark blue ones
				$scope.cardHeaderStyle.color = color == '#0072bb' ? 'white' : 'black';
				
				var imageLocation;
				if ($scope.selected.name == "WATER WORKS") {
					imageLocation = "waterworks.png";
				} else {
					imageLocation = "electricompany.png";
				}
				document.getElementById('utilityImage').src=imageLocation;
				break;
		}
		
		// Stuffs about to get gnar
		var td = $($event.target);
		// Get td position
		var offset = td.offset();
		var eventX = offset.left + td.width() / 2;
		var eventY = offset.top + td.height() / 2;
		// Get center
		var uiOffset = $ui.offset();
		var centerX = uiOffset.left + uiWidth / 2;
		var centerY = uiOffset.top + uiHeight / 2;
		// Clamp card position to center square plus a small overlap
		// To start, coordinates are relative to the center
		var overlap = 15;
		var cardX = eventX - centerX;
		var cardY = eventY - centerY;
		var halfWidth = $card.width() / 2;
		var halfHeight = $card.height() / 2;
		// clamp
		var xLimit = uiWidth / 2 + overlap - halfWidth;
		if (Math.abs(cardX) > xLimit) {
			cardX = (cardX / Math.abs(cardX)) * xLimit;
		}
		var yLimit = uiHeight / 2 + overlap - halfHeight;
		if (Math.abs(cardY) > yLimit) {
			cardY = (cardY / Math.abs(cardY)) * yLimit;
		}
		// position relative to upper left corner
		cardX += centerX;
		cardY += centerY;
		// center card
		cardX -= cardWidth / 2;
		cardY -= cardHeight / 2;
		// Apply position to card
		$card.css({left: cardX, top: cardY});
	}
	
	$scope.spectate = function() {
		$join.hide();
		$joinBackground.hide();
	}
	
	$scope.chooseToken = function() {
		$joinName.hide();
		$joinToken.show();
	}
	
	$scope.join = function(token) {
		$scope.getOp('join?name=' + $scope.username + "&token=" + token,
		function(success) {
			if (success) {
				$join.hide();
				$joinBackground.hide();
			}
			else {
				$joinToken.hide();
				$joinName.show();
			}
		});
	}
	
	$scope.start = function () {
		$scope.getOp('start');
	}
	
	$scope.rolldice = function () {
		$scope.getOp('rolldice');
	}
	
	$scope.isSelected = function() {
		return $scope.selected != null;
	}
	$scope.isProperty = function() {
		return $scope.selected != null && $scope.selected.type == 'PROPERTY';
	}
	$scope.isUtility = function() {
		return $scope.selected != null && $scope.selected.type == 'UTILITY';
	}
	$scope.isTaxes = function() {
		return $scope.selected != null && $scope.selected.type == 'TAXES';
	}
	$scope.isRailroad = function() {
		return $scope.selected != null && $scope.selected.type == 'RAILROAD';
	}
	$scope.isChance = function() {
		return $scope.selected != null && $scope.selected.type == 'CHANCE';
	}
	$scope.isCommunityChest = function() {
		return $scope.selected != null && $scope.selected.type == 'COMMUNITYCHEST';
	}
	$scope.isGo = function() {
		return $scope.selected != null && $scope.selected.type == 'GO';
	}
	$scope.isJail = function() {
		return $scope.selected != null && $scope.selected.type == 'JAIL';
	}
	$scope.isFreeParking = function() {
		return $scope.selected != null && $scope.selected.type == 'FREEPARKING';
	}
	$scope.isGoToJail = function() {
		return $scope.selected != null && $scope.selected.type == 'GOTOJAIL';
	}
	
	$scope.tokenStyle = function(player) {
		// Get the tile the token is on
		var tile = $("#" + player.token.tileIndex);
		// Get copy the position to the token
		var position = tile.position();
		
		return {
			'background-image': 'url("' + player.token.type.toLowerCase() + '.png")',
			left: position.left,
			top: position.top
		};
	}
});

$.fn.animateRotate = function(start, end, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: start}).animate({deg: end}, args);
  });
};