/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Initial Developer of the Original Code is Christoph Dorn.
 *
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *     Jerome Renard <jr@ez.no>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



FBL.ns(function() { with (FBL) { 
Firebug.FireEz = extend(Firebug.Module, 
{ 
    shutdown: function()
    {
      if(Firebug.getPref('defaultPanelName')=='FireEz') 
      {
        Firebug.setPref('defaultPanelName','console');
      }
    },

    showPanel: function(browser, panel) 
    { 
        var isFireEz = panel && panel.name == "FireEz"; 
        var FireEzButtons = browser.chrome.$("fbFireEzButtons"); 
        collapse(FireEzButtons, !isFireEz); 
        this.initeZDebugDivs();
    }, 

    initeZDebugDivs: function()
    {
        var divName = [ 'eZPublishErrors', 'eZPublishWarnings', 'eZPublishNotices' ];

        for(i = 0; i < divName.length; i++)
        {
            FirebugContext.getPanel( "FireEz" ).createDiv( divName[i] );
        }
    },

    showAllErrors: function() 
    { 
      FirebugContext.getPanel("FireEz").showAll(); 
    },

    showErrors: function() 
    { 
        FirebugContext.getPanel("FireEz").displayDiv('eZPublishErrors');
    },

    showWarnings: function() 
    { 
        FirebugContext.getPanel("FireEz").displayDiv('eZPublishWarnings');
    },

    showNotices: function() 
    { 
        FirebugContext.getPanel("FireEz").displayDiv('eZPublishNotices');
    },   
}); 

function FireEzPanel() {} 
FireEzPanel.prototype = extend(Firebug.Panel, 
{ 
    name      : "FireEz", 
    title     : "eZ Publish", 
    searchable: false, 
    editable  : false,
    divList   : new Array('eZPublishErrors', 'eZPublishWarnings', 'eZPublishNotices'),

    createDiv: function( divName )
    {
        if( !this.document.getElementById( divName ) )
        {
            var element = this.document.createElement( 'div' );
            element.id = divName;
            //element.style.display = 'block';
            element.innerHTML = divName;
            this.panelNode.appendChild( element );
        }
    },

    displayDiv: function( divId )
    {
        for( i = 0; i < this.divList.length; i++ )
        {
            if( this.divList[i] == divId )
            {
                this.show( this.divList[i] );
            }
            else
            {
                this.hide( this.divList[i] );
            }
        }
    },

    showAll: function()
    {
        for( i = 0; i < this.divList.length; i++)
        {
            this.show( this.divList[i] );
        }
    },

    show: function( divID )
    {
        if( this.document.getElementById( divID ) )
        {
            this.document.getElementById( divID ).style.display = 'block';
        }
    },
    
    hide: function( divID )
    {
        if( this.document.getElementById( divID ) )
        {
            this.document.getElementById( divID ).style.display = 'none';
        }
    },
}); 


Firebug.registerModule(Firebug.FireEz); 
Firebug.registerPanel(FireEzPanel); 

}});
