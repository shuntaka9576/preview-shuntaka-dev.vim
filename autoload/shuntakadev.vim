function! s:error_callback(args) abort
endfunction

function! s:success_callback(args) abort
endfunction

function! shuntakadev#init_preview() abort
  call denops#request_async('shuntakadev',
        \ 'initServer',
        \ [],
        \ { args -> s:success_callback(args) },
        \ { args -> s:error_callback(args) },
        \ )
endfunction

function! shuntakadev#refresh_content() abort
  call denops#request_async('shuntakadev',
        \ 'refreshContent',
        \ [],
        \ { args -> s:success_callback(args) },
        \ { args -> s:error_callback(args) },
        \ )
endfunction
