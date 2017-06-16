'use strict';

var assert = require( 'chai' ).assert;
var fs = require( 'fs-extra' );

var sugarcoat = require( '../lib/index' );


suite( 'Index: Read Sections', function () {

    test( 'Sugarcoat is converting our section file string into an object with the correct data.', function () {

        var readSectionsConfig = {
            dest: './test/sugarcoat',
            sections: [
                {
                    title: 'Colors File',
                    files: './test/assert/readSections.css'
                }
            ]
        };

        var sectionFilePath = './test/assert/readSections.css'
            , sectionFileExt = 'css'
            , sectionFileSrc = '/**\n *\n * @title Primary Colors\n * @description Client-branded color palette\n * @usage Found only in brand-specific UI elements\n *\n */\n:root {\n    --brand-red: #703030; /* Headlines */\n    --brand-grey: #2F343B; /* Links */\n    --accent-red: #C77966;\n    --accent-grey: #7E827A;\n}'
            ;

        sugarcoat( readSectionsConfig )
        .then( data => {

            var fileData = data.sections[ 0 ].files[ 0 ];

            assert.isObject( fileData, 'The data in the files array is an object.' );
            assert.propertyVal( fileData, 'path', sectionFilePath, 'The sections file path is correct.' );
            assert.propertyVal( fileData, 'ext', sectionFileExt, 'The sections file ext is correct.' );
            assert.propertyVal( fileData, 'src', sectionFileSrc, 'The sections file src is correct.' );

        }, data => {

            assert.isString( data, 'error is not a string' );
        });
    });

    teardown( done => {

        fs.remove( './test/sugarcoat', err => {

            if ( err ) return console.error( err );

            done();
        });
    });
});
