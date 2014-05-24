/* "mouse" simple object by Hatscat aka Lucien Boudy

The MIT License (MIT)

Copyright (c) 2014 Lucien Boudy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function () {
	var m = {
		e: null,
		offsetX : 0,
		offsetY : 0,
		x: 0,
		y: 0,
		oldX: 0,
		oldY: 0,
		moveX: 0,
		moveY: 0,
		pressed: false,
		doubleClicks: false,
		target: { x:0, y:0 },
		m.setOffset = function (x, y) {
			m.offsetX = x;
			m.offsetY = y;
		}
	};
	addEventListener('mousemove', function (e) {
		m.e = e;
		m.oldX = m.x;
		m.oldY = m.y;
		m.x = e.pageX - m.offsetX;
		m.y = e.pageY - m.offsetY;
		m.moveX = m.x == m.oldX ? 0 : m.x < m.oldX ? -1 : 1;
		m.moveY = m.y == m.oldY ? 0 : m.y < m.oldY ? -1 : 1;
	});
	addEventListener('mousedown', function (e) {
		m.e = e;
		m.pressed = true;
		m.target.x = m.x;
		m.target.y = m.y;
	});
	addEventListener('mouseup', function (e) {
		m.e = e;
		m.pressed = false;
	});
	addEventListener('dblclick', function (e) {
		m.e = e;
		m.doubleClicks = true;
	});
	mouse = m;
})()
