function reLevel () {
  // search down rows for colors used
  
  // if all 7 levels used then id the levels with the selected colors - easy 
  
  // if 2 levels used - then id the levels with the default 2 colors (lightColor, white)
  // if 3 levels used - then id the levels with the default 3 colors (darkColor, lightColor, white)
  // if 4 levels used - then id the levels with the default 4 colors (darkColor, lightColor, lightGrey3, white)
  // if 5 levels used - then id the levels with the default 5 colors (darkColor, grey, lightColor, lightGrey3, white)
  // if 6 levels used - then id the levels with the default 5 colors (darkColor, darkGrey2, grey, lightColor, lightGrey3, white)
  // if 7 levels used - then id the levels with the default 5 colors (darkGrey3, darkColor, darkGrey2, grey, lightColor, lightGrey3, white)
  
  // if 2 levels used are different - need to shift to default (or custom color order)
  
  // to determine what levels are being used (most accuractely)
  // find first color (level) and record all levels until the that first color is found again
  // do this recursively with the second color found and so on
  // id them as 1, 2, 3 respectively 
  
  // (Consider 4 levels) 
  // in the first color section (A) pattern could be 4, 3, 1 
  // in the second color section (B) pattern found could be 4, 3, 2
  // in the third color section (C) pattern found could be 4, 1
  // * could it start with a 3, 2, 1 and then a 4, 3, 2, 1 ??? (I DONT THINK THIS SHOULD BE A CORRECT LAYOUT - Otherwise the color 4 will be interpreted as 1 instead in pattern 4, 3, 2, 1 
  
  // if this pattern was found (not very consistent use of level colors) it would be clear that 4 is highest, 3 is second highest, 1 or 2 could be is lowest though.
  // I think the pattern should be reformatted to (A) 3,2,1 (B) 3,2,1 (C) 3,1
  // ie 
  // the top levels must remain similar - 
  // but each of those sections must have a base from 1. 
  // at least one of those sections will go from 1 up to the new top level (because that is the maximum number of levels - if it were not the number would be truncated)
  
  // ABOVE RULE RETHINK - 4, 3, 1 and 3, 3, 2 should be reformated such that all similar colors should remain similar.
  // The color level (eg green) should be the central fixed level (its the item level). 
  // Any completely missing color gaps should be filled in ABOVE the item level.
  // Any gaps between 1 up to the highest-below the item level shall be shifted collapsed down to fill.
  
  // if at any level user wishes to add a new level above an existed level, simply use any new color...
  // When the check-level-reorganise function is executed it will be formatted with the appropriate level-color
  
  // Y G   I P 
  // Y G F I   
  // Y G     P 
  // Y       P 
  // Y     I P 
  
  // 4 3   I W
  // 4 3 2 I 
  // 4 3     W
  // 4       W
  // 4     I W
  
  // Challenges / issues
  // how to detect the white gaps between Major Sections VS the white rows of the base elements? Hmm...
  // Solution
  // Obviously the next Major section will start with a particular color (this color must be manually identified as header for any "island" blocks)
  
  // example of two island blocks 
  
  // Y G     I P 
  // Y G F   I   
  // Y G       P 
  // Y         P 
  // Y       I P 
  
  // Y G     I P 
  // Y G F H I   
  // Y G       P 
  // Y         P 
  // Y       I P 
  
}
