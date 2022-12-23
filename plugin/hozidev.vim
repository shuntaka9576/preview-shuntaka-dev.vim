if exists('g:loaded_hozidev')
  finish
endif

let g:loaded_hozidev = 1

function! s:start_plugin() abort
  command! -buffer HoziDevPreview call hozidev#init_preview()
  execute 'augroup HOZIDEV_INIT' . bufnr('%')
    autocmd!
    autocmd BufWritePost <buffer> :call hozidev#refresh_content()
    autocmd CursorHold,CursorHoldI,CursorMoved,CursorMovedI <buffer> :call hozidev#refresh_content()
  augroup END
endfunction

function! s:init() abort
  autocmd BufEnter *.{md} :call s:start_plugin()
endfunction

call s:init()
