$(document).ready(function() {
    // Setup - add a text input to each footer cell
    // $('#example tfoot th').each( function (i) {
    //     if(i == 1 || i ==0 ) return;
    //     var title = $('#example thead th').eq( $(this).index() ).text();
    //     $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
    // } );
    // $('.input-bulan').html('<input type="text" placeholder="Search " data-index="" /> <input type="text" placeholder="Search " data-index="" />')
    $('.input-kode').html('<input type="text" placeholder="Kode" data-index="3" size="10rem" class="p-2 rounded-md outline-none bg-green-200 text-green-900 focus:bg-green-50 focus:ring-2 focus:ring-green-300"/>')
    $('.input-klasifikasi').html('<input type="text" placeholder="Klasifikasi" data-index="4" size="100%" class="p-2 rounded-md outline-none bg-green-200 text-green-900 focus:bg-green-50 focus:ring-2 focus:ring-green-300"/>')
    $('.input-status').html('<input type="text" placeholder="Status" data-index="5" size="10rem" class="p-2 rounded-md outline-none bg-green-200 text-green-900 focus:bg-green-50 focus:ring-2 focus:ring-green-300"/>')
    $('.input-file').html('<input type="text" placeholder="File" data-index="6" size="18rem" class="p-2 rounded-md outline-none bg-green-200 text-green-900 focus:bg-green-50 focus:ring-2 focus:ring-green-300"/>')

  
    // DataTable
    var table = $('#example').DataTable( {
        scrollY:        "35vh",
        scrollX:        true,
        scrollCollapse: false,
        paging:         true,
        ordering:       false,
        fixedColumns:   true,
        pagingType :    "first_last_numbers",
        columnDefs: [
            {
                targets: 5,
                className: 'dt-body-left'
            }
          ]

        // dom: '<"top"i>rt<"bottom"flp><"clear">'
    } );
 
    // Filter event handler
    $( table.table().container() ).on( 'keyup', 'tfoot input', function () {
        table
            .column( $(this).data('index') )
            .search( this.value )
            .draw();
    } );
} );
