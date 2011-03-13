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
goog.require('wtk.Button');
goog.require('wtk.ThemeSwitcher');
goog.require('wtk.Dialog');
goog.require('wtk.menubar.Menubar');
goog.require('wtk.menubar.Menu');
goog.require('wtk.menubar.MenuItem');
goog.require('wtk.util.Command');
goog.require('wtk.util.KeyboardShortcut');

/**
 * @constructor
 */
showcase = function(parameters) {
  this.menubarId_ = parameters['menubarId'] || 'menubar';
  this.buttonsId_ = parameters['controlButtonsId'] || 'buttons';
  
  this.initThemeSwitcher_();
  this.initAboutDialog_();
  this.initCommands_();
  this.initMenubar_();
  this.initButtons_();
  this.connectListeners_();
};

showcase.prototype.initThemeSwitcher_ = function() {
  new wtk.ThemeSwitcher();
};

showcase.prototype.initCommands_ = function() {
  this.saveCommand_ = new wtk.util.Command();
  this.aboutCommand_ = new wtk.util.Command();
};

showcase.prototype.initMenubar_ = function() {
  this.menubar_ = new wtk.menubar.Menubar();
  this.menubar_.render(goog.dom.getElement(this.menubarId_));
  
  var fileMenu = new wtk.menubar.Menu('File');
  this.menubar_.addMenu(fileMenu);
  
  var editMenu = new wtk.menubar.Menu('Edit');
  this.menubar_.addMenu(editMenu);
       
  var viewMenu = new wtk.menubar.Menu('View');
  this.menubar_.addMenu(viewMenu);
  
  var helpMenu = new wtk.menubar.Menu('Help');
  this.menubar_.addMenu(helpMenu);
  
  var newRecord = new wtk.menubar.MenuItem('New', wtk.icon.NEW_WIN);
  fileMenu.addItem(newRecord);
  
  var save = new wtk.menubar.MenuItem('Save', wtk.icon.DISK);
  fileMenu.addItem(save);
  this.saveCommand_.attachControl(save);
  
  var about  = new wtk.menubar.MenuItem('About', wtk.icon.INFO);
  helpMenu.addItem(about);
  this.aboutCommand_.attachControl(about);
};

showcase.prototype.initButtons_ = function() {
  this.saveButton_ = new wtk.Button('Save');
  this.saveButton_.render(goog.dom.getElement(this.buttonsId_));
  this.saveCommand_.attachControl(this.saveButton_);
  
  this.deleteButton_ = new wtk.Button('Delete');
  this.deleteButton_.render(goog.dom.getElement(this.buttonsId_));
};

showcase.prototype.initAboutDialog_ = function() {
  this.aboutDiag_ = new wtk.Dialog();
  this.aboutDiag_.setPosition(300, 100);
  this.aboutDiag_.render();
  this.aboutDiag_.enableModal(true);
  this.aboutDiag_.setTitle('About WTK');
  this.aboutDiag_.setContent('<p>Example and showcase of WTK</p>');
};

showcase.prototype.connectListeners_ = function() {
  goog.events.listen(this.saveCommand_, wtk.util.Command.EventType.EXECUTE, this.handleSaveExe_, false, this);
  goog.events.listen(this.aboutCommand_, wtk.util.Command.EventType.EXECUTE, this.handleAboutExe_, false, this);
};

showcase.prototype.handleSaveExe_ = function() {
  alert('save')
};

showcase.prototype.handleAboutExe_ = function() {
  this.aboutDiag_.open();
};


goog.exportSymbol('showcase', showcase);