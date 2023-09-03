if exists('g:loaded_shuntakadev')
  finish
endif

let g:loaded_shuntakadev = 1

function! s:start_plugin() abort
  command! -buffer ShuntakaDevPreview call shuntakadev#init_preview()
  execute 'augroup shuntakadev_INIT' . bufnr('%')
    autocmd!
    autocmd BufWritePost <buffer> :call shuntakadev#refresh_content()
    autocmd CursorHold,CursorHoldI,CursorMoved,CursorMovedI <buffer> :call shuntakadev#refresh_content()
  augroup END
endfunction

function! s:init() abort
  autocmd BufEnter *.{md} :call s:start_plugin()
endfunction

call s:init()
