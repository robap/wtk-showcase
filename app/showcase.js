// Copyright 2011 Robert Apodaca. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('showcase');

goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require('wtk.ThemeSwitcher');
goog.require('wtk.Dialog');

/**
 * @constructor
 */
showcase = function(parameters) {
  this.parameters_ = {};
  this.parameters_.containerId = parameters['containerId'] || 'showcase';
  this.parameters_.dialogButtonOpenId = parameters['dialogOpenButtonId'] || 'show_dialog';
  this.parameters_.dialogButtonCloseId = parameters['dialogCloseButtonId'] || 'close_dialog';
  
  this.initializeThemeSwitcher_();
  this.initializeDialog_();
};

showcase.prototype.initializeThemeSwitcher_ = function() {
  new wtk.ThemeSwitcher();
};

showcase.prototype.initializeDialog_ = function() {
  var diag = new wtk.Dialog();
  diag.setPosition(100, 100);
  diag.render();
  diag.setTitle('Demo Dialog');
  diag.setContent('<p>This is the inner content of the Dialog</p>');
  
  var open_button = new goog.ui.Button();
  open_button.decorate(goog.dom.getElement(this.parameters_.dialogButtonOpenId));

  var close_button = new goog.ui.Button();
  close_button.decorate(goog.dom.getElement(this.parameters_.dialogButtonCloseId));
  close_button.setEnabled(false);

  goog.events.listen(open_button, goog.ui.Component.EventType.ACTION, function(){
    open_button.setEnabled(false);
    close_button.setEnabled(true);
    diag.open();
  });

  goog.events.listen(close_button, goog.ui.Component.EventType.ACTION, function(){
    close_button.setEnabled(false);
    open_button.setEnabled(true);
    diag.close();
  });
};

goog.exportSymbol('showcase', showcase);