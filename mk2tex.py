#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Da invocare con "absolute_file_path.md"
# pandoc /Users/gmanzoli/Documents/Università/_Appunti/Apprendimento\ Automatico/notes/AAL090411\ -\ Reti\ neurali.md -f markdown -t latex -o lezioni/lezione1.tex 

### Non ancora funzionante, c'è un problema nella gestione dei path


import os
import os.path
import sys
import subprocess

def main():
    if len(sys.argv) <= 1:
        print 'Manca il file_path assoluto.'
        return
    abs_file_path = sys.argv[1]
    print 'Input file: ', abs_file_path

    splitted_path = abs_file_path.split('/')
    course_path = splitted_path[splitted_path.index('_Appunti')+1]

    lez_code = splitted_path[-1].split(' ')[0]
    lez_num = int(lez_code[-6:-4])

    course_path = course_path.replace(' ', '\\ ')
    output_path = ('/'.join(splitted_path[0:splitted_path.index('_Appunti')+1]))+'/'+course_path+'/lezioni/lezione'+str(lez_num)+'.tex'

    print os.path.exists(output_path)
    if os.path.exists(output_path):
        var = raw_input('Il file esiste già, vuoi sovrascriverlo? [y/n]')
        if var != 'y':
            return
        else:
            print 'Sovrascrivo'

    print 'Output: ', output_path

    cmd = ['pandoc', abs_file_path.replace(' ','\\ '), '-o '+output_path]
    print 'Command: \n', ' '.join(cmd)
    subprocess.call(cmd, shell=False)
    print 'Processo completato'


if __name__ == "__main__":
    main()