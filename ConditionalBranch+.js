
function Check() {};

/*:
 * @plugindesc Conditional Branch+ v1.0: Checks for various things.
 * Read help file for more information.
 * @author mjshi
 *
 * @help
 * ------------------------------------------------------------------------------
 *    Conditional Branch+ v1.0
 *     Extends the functionality of what a conditional branch can check.
 *     By mjshi, OK for use in all projects with credit.
 * ------------------------------------------------------------------------------
 * How to use:
 * On a conditional branch, go to the fourth tab and select the "Script" option.
 * Type in desired thing to check. See below...
 * ==============================================================================
 *               Asterisk (*) means multiple inputs are accepted.
 * ==============================================================================
 * Combining Checks
 * Use "&&", "||", and "()" to combine several checks in a conditional branch.
 *   && = this AND that are true
 *   || = this OR that are true
 *   () = order of operations, check innermost parentheses first
 *   !  = translates to NOT. EX. !Check.has(1) checks if player DOESN'T have
 *        item id 1 in their inventory.
 * 
 * -- EX: (Check.has(1) && Check.greater(1 , 0)) || Check.has(2)
 * -- Checks if player has item 1 and variable 1 > 0, or player has item 2.
 * ==============================================================================
 *  Possible Checks
 * ------------------------------------------------------------------------------
 *    Items
 * ------------------------------------------------------------------------------
 * Check.has(*items)
 * -- EX: Check.has(1, 3, 4)
 * -- checks if player has items 1, 3, and 4 in inventory.
 * 
 * Check.has_more(*items, number)
 * -- EX: Check.has_more(1, 2, 3, 4, 5)
 * -- checks if player has at least five (includes 5) of items 1, 2, 3, 4.
 * 
 * Check.has_less(*items, number)
 * -- EX: Check.has_less(1, 2, 3, 4, 5)
 * -- checks if player has at most five (includes 5) of items 1, 2, 3, 4.
 * 
 * Check.has_any(*items)
 * -- EX: Check.has_any(1, 3, 4)
 * -- checks if player has either item 1, 3, or 4 in inventory.
 * 
 * Check.each_more(*[item, number])
 * -- EX: Check.each_more([1, 2], [2, 4])
 * -- checks if there are at least 2 of item 1 and at least 4 of item 2.
 * 
 * Check.each_less(*[item, number])
 * -- EX: Check.each_less([1, 2], [2, 4])
 * -- checks if there are at most 2 of item 1 and at most 4 of item 2.
 * ------------------------------------------------------------------------------
 *    Variables
 * ------------------------------------------------------------------------------
 * Check.is_any(variable, *values)
 * -- EX: Check.is_any(1, 3, 4, 5)
 * -- checks if variable 1 is either 3, 4, or 5.
 * 
 * Check.greater(*variables, value)
 * -- EX: Check.greater(1, 2, 3, 5)
 * -- checks if variables 1, 2, and 3 are at least 5.
 * 
 * Check.lesser(*variables, value)
 * -- EX: Check.lesser(1, 2, 3, 5)
 * -- checks if variables 1, 2, and 3 are at most 5.
 * 
 * Check.in_range(*variables, start, stop)
 * -- EX: Check.in_range(1, 3, 4, 5)
 * -- checks if variable 1 AND 3 are between 4 and 5, including 4 and 5.
 * 
 * Check.any_inrange(*variables, start, stop)
 * -- EX: Check.any_inrange(1, 3, 4, 5)
 * -- checks if variable 1 OR 3 are between 4 and 5, including 4 and 5.
 * 
 * Check.each_is(*[variable, value])
 * -- EX: Check.each_is([1, 3], [4, 5])
 * -- checks if variable 1 is 3, and variable 4 is 5.
 * 
 * Check.each_greater(*[variable, value])
 * -- EX: Check.each_greater([1, 3], [4, 5])
 * -- checks if variable 1 is at least 3 and variable 4 is at least 5.
 * 
 * Check.each_lesser(*[variable, value])
 * -- EX: Check.each_lesser([1, 3], [4, 5])
 * -- checks if variable 1 is at most 3 and variable 4 is at most 5.
 * 
 * Check.each_inrange(*[variable, start, stop])
 * -- EX: Check.in_range([1, 3, 5], [3, 1, 4])
 * -- checks if variable 1 is between 3 and 5, and variable 3 is between 1 and 4.
 * ------------------------------------------------------------------------------
 *    Switches
 * ------------------------------------------------------------------------------
 * Check.all_true(*switches)
 * -- EX: Check.true(1, 2, 3)
 * -- checks if switches 1, 2, 3 are true.
 * 
 * Check.any_true(*switches)
 * -- EX: Check.any_true(1, 2, 3)
 * -- checks if either of switches 1, 2, 3 are true.
 * 
 * Check.all_false(*switches)
 * -- EX: Check.false(1, 2, 3)
 * -- checks if switches 1, 2, 3 are false.
 * 
 * Check.any_false(*switches)
 * -- EX: Check.any_false(1, 2, 3)
 * -- checks if either of switches 1, 2, 3 are false.
 * 
 * Check.each_switch(*[switch, on/off])
 * If on, put 1. If off, put 0.
 * ==============================================================================
 */

/* Items */

Check.has = function () {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if (!$gameParty.hasItem($dataItems[items[i]])) return false}
		return true;
};

Check.has_more = function () {
	var items = Array.prototype.slice.call(arguments);
	var number = items[items.length - 1];
	items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataItems[items[i]]) < number) return false}
		return true;
};

Check.has_more = function () {
	var items = Array.prototype.slice.call(arguments);
	var number = items[items.length - 1];
	items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataItems[items[i]]) < number) return false}
		return true;
};

Check.has_less = function () {
	var items = Array.prototype.slice.call(arguments);
	var number = items[items.length - 1];
	items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataItems[items[i]]) > number) return false}
		return true;
};

Check.has_any = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if ($gameParty.hasItem($dataItems[items[i]])) return true}
		return false;
};

Check.each_more = function() {
	var items_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items_array.length; i++) {if ($gameParty.numItems($dataItems[items_array[i][0]]) < items_array[i][1]) return false}
		return true;
};

Check.each_more = function() {
	var items_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items_array.length; i++) {if ($gameParty.numItems($dataItems[items_array[i][0]]) > items_array[i][1]) return false}
		return true;
};

/* Variables */

Check.is_any = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values[0];
	values.shift();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) == values[i]) return true}
		return false;
};

Check.is_not = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values[0];
	values.shift();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) == values[i]) return false}
		return true;
};

Check.greater = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values[values.length - 1];
	values.pop();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) < values[i]) return false}
		return true;
};

Check.lesser = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values[values.length - 1];
	values.pop();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) > values[i]) return false}
		return true;
};

Check.in_range = function() {
	var ids = Array.prototype.slice.call(arguments);
	var start = ids[ids.length - 2];
	var stop = ids[ids.length - 1];
	ids.splice(ids.length - 2);

	for (var i = 0; i < ids.length; i++) {if ($gameVariables.value(ids[i]) < start || $gameVariables.value(ids[i]) > stop) return false}
		return true;
};

Check.any_inrange = function() {
	var ids = Array.prototype.slice.call(arguments);
	var start = ids[ids.length - 2];
	var stop = ids[ids.length - 1];
	ids.splice(ids.length - 2);

	for (var i = 0; i < ids.length; i++) {if ($gameVariables.value(ids[i]) >= start && $gameVariables.value(ids[i]) <= stop) return true}
		return false;
};

Check.each_is = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) != variable_array[i][1]) return false}
		return true;
};

Check.each_greater = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) < variable_array[i][1]) return false}
		return true;
};

Check.each_lesser = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) > variable_array[i][1]) return false}
		return true;
};

Check.each_inrange = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) < variable_array[i][1] || $gameVariables.value(variable_array[i][0]) > variable_array[i][2]) return false}
		return true;
};

/* Switches */

Check.all_true = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if (!$gameSwitches.value(switches[i])) return false}
		return true;
};

Check.any_true = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if ($gameSwitches.value(switches[i])) return true}
		return false;
};

Check.all_false = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if ($gameSwitches.value(switches[i])) return false}
		return true;
};

Check.any_false = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if (!$gameSwitches.value(switches[i])) return true}
		return false;
};

Check.each_switch = function() {
	var switches_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches_array.length; i++) {if ($gameSwitches.value(switches_array[i][0]) != switches_array[i][1]) return false}
		return true;
};