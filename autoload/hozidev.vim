function! s:error_callback(args) abort
endfunction

function! s:success_callback(args) abort
endfunction

function! hozidev#init_preview() abort
  call denops#request_async('hozidev',
        \ 'initServer',
        \ [],
        \ { args -> s:success_callback(args) },
        \ { args -> s:error_callback(args) },
        \ )
endfunction

function! hozidev#refresh_content() abort
  call denops#request_async('hozidev',
        \ 'refreshContent',
        \ [],
        \ { args -> s:success_callback(args) },
        \ { args -> s:error_callback(args) },
        \ )
endfunction
