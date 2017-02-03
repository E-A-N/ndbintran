#The bintran (Binary Translator) translates binary to strings and vice versa

class bin_translation:
    def __init__(self,dat_choice=None,dat_val=None):
        self.temp_msg = 'N\\A' 
        self.temp_trs = ''
        self.translated = False
        self.cool_converted = False
        self.zero_chr = 'N\\A'
        self.one_chr = 'N\\A'
        self.current_chr = '' #current chr is empty for prospective iteration usage
        def bin_input(): #inform user on how to use program & prompt to input data
            if ((dat_choice == None) & (dat_val == None)):
                b_choice = str(input("For String to Binary press 0:\nFor Binary to Str press 1:\n"))
                b_dat = str(input("Enter your data: "))
            else:
                b_choice = dat_choice #enter 0 for string to bin, or 1 paramter for Binary to message
                b_dat = str(dat_val)
            return b_choice,b_dat
            #having the bin_input() function return tuple will simulate case-switch convention
        self.bin_data = bin_input()
        self.bin_array = []
        self.cool_array = []
        #self.translate() #auto translate
       
    def translate(self): #This method will translate the data entered in bin_input() function
        if (int(self.bin_data[0]) == 0): #convert string to binary integer
            for t in self.bin_data[1]:
                print(int(str(bin(ord(t)))[2:]), end=' ')
                self.bin_array.append(int(str(bin(ord(t)))[2:])) #update main array
            self.translated = True
            return
        elif (int(self.bin_data[0]) == 1): #convert binary integer to string (english)
            self.temp_msg = str(self.bin_data[1])
            for m in self.temp_msg.split(' '):
                self.temp_trs += str(chr(eval('0b' + str(m))))
            self.bin_array = self.temp_msg.split(' ') #update main array
            self.translated = True
            return self.temp_trs

    def cool_stuff(self): #This method will allow binary characters to be changed arbitrarily
        if (len(self.cool_array) > 1):
            if (str(input("Press 2 to delete current cool array, or just press enter to combine both arrays")) == '2'):
                self.cool_array = []
        if (self.translated != True):
            print("Translate your data 1st before doing cool stuff, dude")
            return
        self.zero_chr = str(input("Enter the character you\'d like to replace '0' with:\n"))
        self.one_chr = str(input("Enter the character you\'d like to replace '1' with:\n"))
        self.current_chr = ''
        for x in self.bin_array: #iterate through translated array, then iterate through solo elements to replace chrs
            for z in str(x):
                if ('0' in z):
                    self.current_chr += self.zero_chr
                elif ('1' in z):
                    self.current_chr += self.one_chr
            self.cool_array.append(self.current_chr);
            self.current_chr=''
        self.cool_converted = True
        return self.cool_array

##### End of  bin_translation object ####

#This function will translate unique binary based messages back to original strings
#Make sure you know the correct characters and correct amount of characters to translate =]
#Paste binary based message into variable when running. ('Enter your data: ')
def cool_trans(repeat=None,ze_chr=None,o_chr=None,deb=None):
    if (type(ze_chr) != str):
        zero_chr = str(input("Enter the character that represents '0':\n"))
    else:
        zero_chr = str(ze_chr) #pass parameter as a string to zero_chr
    zero_consec = len(zero_chr)
    #the '_consec' variables enable multidimensional binaries!
    if (type(o_chr) != str):
        one_chr = str(input("Enter the character that represents '1':\n"))
    else:
        one_chr = str(o_chr) #pass parameter as a string to one_chr
    if (one_chr[0] == zero_chr[0]): #Check for duplicate 1st characters
        print("You can\'t choose the 1st same characters, sorry")
        return
    one_consec = len(one_chr)
    if (deb == None):
        cool_dat = eval(input("Enter your data: "))
    else:
        cool_dat = deb #pass deb parameter as a sequence (binary message) to cool_dat, meant for debugging
    trans = ''; trans_array=[]
    orig_msg=''
    auto_iterator = 0
    #convert unique characters to standard binary
    for a in cool_dat:
        for b in a:
            if auto_iterator > 0: #automatically skip iterations based off how many characters are in zero_chr
                auto_iterator -= 1
                continue
            if (b == zero_chr[0]):
                auto_iterator = zero_consec - 1
                trans += '0'
                continue
            elif (b == one_chr[0]):
                auto_iterator = one_consec - 1
                trans += '1'
                continue
        trans_array.append(trans)
        trans = ''
    #convert binary to string message
    for x in trans_array:
        orig_msg += str(chr(eval('0b' + str(x))))
    return orig_msg


#features to add: -bin_translation.new_array() method
#                 -repeat parameter control-flow in cool_trans() function
#                 -reading and printing arrays & cool arrays to/from files
#                 -enable 'cool_trans()' function to get rid of brackets at beggining and end of objects(lists)
#                      or files.
