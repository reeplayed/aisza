def ship(request):
    
    ships = [5, 4, 3, 3,5, 2, 2, 2]

    output_choices = []

    output_borders = {}

    ships_dementions = {}

    scope = [i for i in range(0, 10)]

    all = []

    for i in scope:
        for j in scope:
            all.append([i,j])

    directions = [(0,1), (0, -1), (1, 0), (-1, 0)]

    def valid(array, all, choices):
            for element in array:
                if (element not in all) or (element in choices):
                    return False
            return True

    border = []
    choices = []

    index = 1

    for length in ships:

        isFind = False

        repeatings = []

        cyclic_border = []

        cyclic_choice = []

        while not isFind:
            rand = random.choice(all) # all-choices-border
           
            random.shuffle(directions)

            for dir in directions:

                drct = [ [rand[0]+i*dir[0], rand[1]+i*dir[1]] for i in range(1, length+1)]
                
                if valid(drct, all, choices+border):
                    
                    ships_dementions[f'ship{index}'] = length

                    choices += drct
                    output_choices += [ { 'idx':(i[0]*len(scope)+i[1]), 'name': f'ship{index}', 'hit': False} for i in drct]

                    cyclic_border.append([  drct[0][0]-dir[0] , drct[0][1]-dir[1]       ])
                    cyclic_border.append([  drct[len(drct)-1][0]+dir[0] , drct[len(drct)-1][1]+dir[1]       ])
                    
                    for item in range(-1,len(drct)+1):
                        cyclic_border.append([      rand[0]+dir[1]+dir[0]*(item+1), rand[1]+dir[0]+dir[1]*(item+1)    ])
                        cyclic_border.append([      rand[0]-dir[1]+dir[0]*(item+1), rand[1]-dir[0]+dir[1]*(item+1)    ])
                    
                    output_borders[f'ship{index}'] = []
                    
                    for i in cyclic_border:
                        if (i[0] in scope) and (i[1] in scope):
                            output_borders[f'ship{index}'].append((i[0]*len(scope)) + i[1])


                    index += 1

                    border += cyclic_border
                    isFind = True
                    break
            repeatings.append(rand)

    randoms = [ (i[0]*len(scope))+i[1] for i in choices]
    
    final_output = []

    for i in range(0,100):
        if i not in randoms:
            final_output.append({'idx': i, 'name': '', 'hit': False})
       
    final_output += output_choices

    final_output = sorted(final_output, key = lambda i: (i['idx'])) 

    # all = [ i[0]*10+i[1] for i in all]
    # randoms = [ (i[0]*len(scope))+i[1] for i in choices]
    # border = [ ((i[0]*len(scope)) if i[0] in scope else 1000) + (i[1] if i[1] in scope else 1000) for i in border]

    res = {
        'array' : final_output,
        'ships': ships_dementions,
        'border': output_borders
    }

    return Response(res)