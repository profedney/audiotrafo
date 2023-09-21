Pw1 = input("Potência (watts) ?")
Zi1 = input("Impedancia do primario (ohms) ?")
Zo1 = input("Impedancia do secundario (ohms) ?")
F1 = input("Frequencia (Hz) ?")

Pw = float(Pw1)
Zi = float(Zi1)
Zo = float(Zo1)
F = float(F1)


Bm = 11300.0
DC = 3.0

# calculo
Vi = (Pw*Zi)**(1/2)
Ii = Pw/Vi

Vo = (Pw*Zo)**(1/2)
Io = Pw/Vo

Si = Ii/DC
So = Io/DC

Bitolai = 2*(Si/3.14159265)**(1/2)
Bitolao = 2*(So/3.14159265)**(1/2)
          
Sm = 7.5*((1.5*Pw)/F)**(1/2)
Sg = 1.1*Sm

print("secçao minima do nucleo:  (cm2)")
print (Sg)

L1 = input("Largura da perna central (cm) ?")
H1 = input("Empilhamento do nucleo (cm) ?")

L = float(L1)
H = float(H1)

Sgo = L * H
Smo = Sgo / 1.1
          
correct = False
AWG = 0
while correct == False:
    Bitola = 0.005*92**((36-AWG)/39)*25.4
    if Bitolai >= Bitola:
        Wi = AWG - 1
        correct = True
    else:
        AWG = AWG + 1

correct = False
AWG = 0
while correct == False:
    Bitola = 0.005*92**((36-AWG)/39)*25.4
    if Bitolao >= Bitola:
        Wo = AWG - 1
        correct = True
    else:
        AWG = AWG + 1


Ni = int(Vi * 100000000 / (4.44 * Bm * Smo * F))
No = int(Vo / Vi * Ni)

# Resultados
print ("Tensao primario (V):" + str(Vi))
print ("Corrente primario (A):" + str(Ii))
print ("Espiras primario:" + str(Ni))
print ("Bitola primario (AWG):" + str(Wi))
print ("Espiras secundario:" + str(No))
print ("Bitola secundario (AWG):" + str(Wo))